import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { demoContainers, demoPorts } from '../data/containerDemoData';
import type { ContainerStatus } from '../data/containerDemoData';

type MessageAction = {
  label: string;
  to: string;
};

type AssistantMessage = {
  id: number;
  role: 'assistant' | 'visitor';
  text: string;
  action?: MessageAction;
};

const initialMessages: AssistantMessage[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi, I’m the Global Edge Consultant demo assistant. I can look up sample port availability or container records, and help you find the shipment tracking page.',
  },
];

const normalizeIdentifier = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');

function getStatusGuidance(status: ContainerStatus) {
  const guidance: Record<ContainerStatus, string> = {
    Available: 'The sample record marks it ready for customer allocation. Confirm live inventory before making a booking.',
    Expected: 'The sample record is expected to arrive; the ETA is illustrative and release is not guaranteed.',
    Reserved: 'The sample record is held for a booking, so it should not be treated as available.',
    Unavailable: 'The sample record is on hold. Its release timing is not confirmed.',
    'In transit': 'The sample record is on the move. Check carrier milestones for current details.',
  };
  return guidance[status];
}

function answerQuestion(question: string): Omit<AssistantMessage, 'id' | 'role'> {
  const normalized = normalizeIdentifier(question);
  const containerMatch = question.length >= 8
    ? demoContainers.find((container) => normalized.includes(normalizeIdentifier(container.id)))
    : undefined;

  if (containerMatch) {
    return {
      text: `${containerMatch.id} (${containerMatch.size}) is marked ${containerMatch.status} in the sample records. Route: ${containerMatch.origin} → ${containerMatch.currentPort}${containerMatch.nextPort !== containerMatch.currentPort ? ` → ${containerMatch.nextPort}` : ''}. Sample ETA: ${containerMatch.eta}. ${getStatusGuidance(containerMatch.status)}`,
      action: { label: 'Open shipment tracking', to: '/track-shipment' },
    };
  }

  const port = demoPorts.find((item) => question.toLowerCase().includes(item.name.toLowerCase()));
  if (port) {
    return {
      text: `${port.name} (${port.country}) has ${port.available} available, ${port.expected} expected, ${port.reserved} reserved, and ${port.unavailable} unavailable containers in the demo data. Estimated 7-day demand is ${port.sevenDayDemand}. These are sample counts, not live port inventory.`,
      action: { label: 'Open container pipeline', to: '/container-pipeline' },
    };
  }

  if (/\b(available|availability|stock|inventory|shortage|demand)\b/i.test(question)) {
    const portSummary = demoPorts
      .map((item) => `${item.name}: ${item.available} available vs ${item.sevenDayDemand} estimated demand`)
      .join('; ');
    return {
      text: `Here is the sample snapshot: ${portSummary}. Expected arrivals and transit time must be checked before promising equipment. This assistant has no live inventory connection.`,
      action: { label: 'Review all ports', to: '/container-pipeline' },
    };
  }

  if (/\b(track|tracking|shipment|bill of lading|bol)\b/i.test(question)) {
    return {
      text: 'I can help find a container in the demo records. For live carrier milestones, open the tracking page and follow its Maersk official-tracking link. This assistant does not submit your ID to Maersk.',
      action: { label: 'Open shipment tracking', to: '/track-shipment' },
    };
  }

  if (/\b(book|booking|reserve|customer|help|problem|issue)\b/i.test(question)) {
    return {
      text: 'I can show sample availability and movement records to support a first check. The demo cannot reserve a container, change a booking, contact an operator, or verify a customer commitment. Check live systems with your operations team before promising availability.',
      action: { label: 'Review the sample pipeline', to: '/container-pipeline' },
    };
  }

  return {
    text: 'I can check sample availability by port, look up a sample container number, or guide you to shipment tracking. Try “What is available in Singapore?” or enter a sample ID such as MSCU 481205-7. My answers use demo records only.',
  };
}

export default function GlobalEdgeAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (value: string) => {
    const question = value.trim();
    if (!question) return;

    const visitorMessage: AssistantMessage = {
      id: Date.now(),
      role: 'visitor',
      text: question,
    };
    const answer = answerQuestion(question);
    setMessages((current) => [
      ...current,
      visitorMessage,
      { ...answer, id: Date.now() + 1, role: 'assistant' },
    ]);
    setDraft('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isOpen && (
        <section
          aria-label="Global Edge Consultant demo assistant"
          className="mb-3 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[#082d3b] to-[#0c6671] px-4 py-3.5 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c4f15b] text-[#103c3d]">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Global Edge Consultant</p>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-cyan-100/80"><Sparkles className="h-3 w-3" />Demo assistant · sample data only</p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant" className="rounded-lg p-2 text-cyan-50/80 transition hover:bg-white/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-amber-100 bg-amber-50 px-4 py-2 text-[10px] leading-4 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            Not a live AI or support service. No real-time carrier data, bookings, or customer accounts.
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/80 p-3 dark:bg-slate-950/40" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${message.role === 'visitor' ? 'rounded-br-md bg-[#0c6671] text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}>
                  <p>{message.text}</p>
                  {message.action && (
                    <Link to={message.action.to} onClick={() => setIsOpen(false)} className="mt-2 inline-flex items-center gap-1.5 font-semibold text-cyan-800 hover:underline dark:text-cyan-300">
                      {message.action.label}<span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            {messages.length === 1 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {['Availability in Singapore?', 'Find MSCU 481205-7'].map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="rounded-full border border-cyan-800/20 px-2.5 py-1 text-[10px] font-medium text-cyan-900 transition hover:bg-cyan-50 dark:border-cyan-700/50 dark:text-cyan-200 dark:hover:bg-slate-800">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={200}
                aria-label="Ask the Global Edge Consultant demo assistant"
                placeholder="Ask about sample containers…"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
              />
              <button type="submit" disabled={!draft.trim()} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c6671] text-white transition hover:bg-[#09545d] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-cyan-700 dark:hover:bg-cyan-600">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close Global Edge Consultant demo assistant' : 'Open Global Edge Consultant demo assistant'}
        onClick={() => setIsOpen((open) => !open)}
        className="ml-auto flex items-center gap-2 rounded-full bg-[#c4f15b] px-4 py-3 text-sm font-bold text-[#103c3d] shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-[#d2ff78] focus:outline-none focus:ring-4 focus:ring-lime-500/30"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>{isOpen ? 'Close' : 'Ask Global Edge'}</span>
      </button>
    </div>
  );
}
