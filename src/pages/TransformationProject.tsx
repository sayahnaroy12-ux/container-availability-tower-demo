import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  ExternalLink,
  FileSearch,
  Gauge,
  Layers3,
  Lightbulb,
  Search,
  ShieldAlert,
  Ship,
  Users,
} from 'lucide-react';

const trackingUrl = 'https://www.maersk.com/tracking/';

const projectSections = [
  {
    number: '01',
    title: 'Primary research and problem register',
    label: 'Start here',
    icon: FileSearch,
    summary: 'Extract employee observations faithfully, separate direct statements from interpretation, and classify the scale of each issue.',
    points: [
      'Capture each problem, exact employee evidence, operational impact, plausible root cause, and evidence still needed.',
      'Tag the process or department and distinguish local, departmental, regional, and potentially company-wide findings.',
      'Do not invent interview responses or treat one interview as proof of a global failure.',
    ],
  },
  {
    number: '02',
    title: 'Existing Maersk technology landscape',
    label: 'Research',
    icon: Layers3,
    summary: 'Verify what is already available before suggesting another platform or claiming a capability is missing.',
    points: [
      'Investigate verified tracking, visibility, forecasting, transport, warehouse, integration, and decision-support capabilities.',
      'For each system, document what it does, users, required data, supported decisions, limitations, and whether it addresses the reported issue.',
      'Separate availability from deployment coverage, employee adoption, and demonstrated effectiveness; prioritize official and credible sources.',
    ],
  },
  {
    number: '03',
    title: 'Root-cause diagnosis',
    label: 'Diagnosis',
    icon: Search,
    summary: 'Test causes across people, processes, technology, data, management, and external dependencies.',
    points: [
      'Use McKinsey 7S to assess alignment across strategy, structure, systems, shared values, skills, style, and staff.',
      'Use fishbone and Five Whys where they clarify an evidence-backed problem; avoid forcing frameworks onto the analysis.',
      'Apply people–process–technology and change readiness to determine whether the need is technical, operational, leadership-led, or combined.',
    ],
  },
  {
    number: '04',
    title: 'Digital transformation paradox',
    label: 'Hypothesis testing',
    icon: CircleHelp,
    summary: 'Test why operational problems might persist despite existing digital capability instead of assuming the answer.',
    points: [
      'Assess fragmentation, legacy dependencies, poor communication, training, adoption, accountability, incentives, exception handling, and external dependencies.',
      'Classify every explanation as confirmed, supported but unproven, plausible and needing validation, or contradicted.',
      'Investigate the gap between an AI recommendation and the operational decision or action that follows.',
    ],
  },
  {
    number: '05',
    title: 'Supply Chain Tower product evaluation',
    label: 'Product fit',
    icon: Ship,
    summary: 'Evaluate the tower as a hypothesis—not as an assumed solution—and look for incremental value over what already exists.',
    points: [
      'Map the verified employee problems the concept could address and identify the wider organizational changes it cannot replace.',
      'Compare internal and competitor capabilities to test for duplication, integration opportunities, workflow improvement, or an unmet need.',
      'Assess a justified architecture: integrations, visibility, exceptions, recommendations, collaboration, escalation, role-based views, and human approval.',
      'Make a build, buy, integrate, or process-redesign recommendation based on evidence, feasibility, and measurable value.',
    ],
  },
  {
    number: '06',
    title: 'Leadership and organisational transformation',
    label: 'People & change',
    icon: Users,
    summary: 'Treat technology as one part of a leadership-led operational transformation.',
    points: [
      'Specify leadership, employee, workflow, technology, decision-right, training, and performance-monitoring changes.',
      'Select useful change models such as Kotter, ADKAR, transformational leadership, or Lewin; do not add frameworks for decoration.',
      'Address adoption barriers, trust in AI-supported decisions, accountability, and reinforcement in day-to-day operations.',
    ],
  },
  {
    number: '07',
    title: 'Financial and operational business case',
    label: 'Value',
    icon: BriefcaseBusiness,
    summary: 'Build a transparent case that separates verified company figures from assumptions.',
    points: [
      'Consider implementation, integration, training, and maintenance costs alongside operational and customer outcomes.',
      'Use ROI, payback, and conservative/base/optimistic scenarios only when defensible assumptions and source data are available.',
      'Do not fabricate savings, benefits, or precise returns without sufficient evidence.',
    ],
  },
  {
    number: '08',
    title: 'Implementation roadmap',
    label: 'Delivery',
    icon: ArrowRight,
    summary: 'Use a gated pilot and scale only when measurable evidence supports it.',
    points: [
      'Sequence diagnosis and baseline; pilot design; pilot delivery and training; evaluation and refinement; controlled scaling.',
      'For each phase, identify timeline, accountable owner, activities, resources, risks, success criteria, and go/no-go decision.',
      'Pilot a specific workflow or unit before proposing enterprise-wide deployment.',
    ],
  },
  {
    number: '09',
    title: 'KPIs, risks, and governance',
    label: 'Measurement',
    icon: Gauge,
    summary: 'Define measurable outcomes linked directly to validated problems—without inventing current performance.',
    points: [
      'Potential KPIs include exception resolution time, visibility accuracy, on-time delivery, adoption, response time, forecast accuracy, and cost per shipment.',
      'For each KPI define the formula, measurement method, data source, baseline requirement, justified target, and accountable owner.',
      'Include data quality, privacy, security, human oversight, operational constraints, and governance risks.',
    ],
  },
  {
    number: '10',
    title: 'Executive consulting deliverable',
    label: 'Synthesis',
    icon: ClipboardList,
    summary: 'Synthesize evidence into a clear, defensible report and presentation for an MBA leadership and transformation assessment.',
    points: [
      'Cover executive summary, context, problem, primary evidence, verified technology, gaps, diagnosis, leadership, product evaluation, recommendations, economics, roadmap, KPIs, risks, and final recommendation.',
      'Use diagrams where they clarify current and future workflows, root causes, 7S alignment, system boundaries, architecture, change, roadmap, and performance.',
      'Make sources, uncertainty, assumptions, and conflicting evidence traceable.',
    ],
  },
];

const supportingQuestions = [
  'Are existing solutions insufficient, underused, or not connected to the workflow?',
  'What evidence points to fragmented data, delayed decisions, poor data quality, or weak coordination?',
  'Do employee experiences reveal a gap between digital strategy and frontline execution?',
  'How do leadership, culture, capabilities, and accountability influence adoption?',
  'Can the Supply Chain Tower address a validated root cause, or should the concept be an integration layer?',
  'Would process and organizational change create more value than introducing a new platform?',
];

export default function TransformationProject() {
  const [openSections, setOpenSections] = useState<string[]>(['01']);

  const toggleSection = (section: string) => {
    setOpenSections((current) => current.includes(section)
      ? current.filter((item) => item !== section)
      : [...current, section]);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8">
      <header className="relative isolate overflow-hidden rounded-[28px] bg-[#082d3b] px-6 py-7 text-white shadow-xl shadow-cyan-950/10 sm:px-9 sm:py-9">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_82%_15%,rgba(34,211,238,0.28),transparent_38%),linear-gradient(112deg,#082d3b_3%,#0a4050_62%,#076478_100%)]" />
        <div className="absolute -right-10 -top-32 -z-10 h-80 w-80 rounded-full border border-cyan-100/10" />
        <div className="absolute -right-2 -top-20 -z-10 h-64 w-64 rounded-full border border-cyan-100/10" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-cyan-100">
            <BookOpenCheck className="h-4 w-4" /> LEADERSHIP & ORGANISATIONAL TRANSFORMATION
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Maersk Supply Chain Tower</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50/80 sm:text-base">
            Evidence-led consulting workspace to investigate why operational challenges can persist alongside digital capability—and determine what combination of leadership, process, and technology can improve outcomes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#c4f15b] px-4 py-2.5 text-sm font-bold text-[#102b24] transition hover:bg-[#d2ff78]">
              Open Maersk shipment tracking <ExternalLink className="h-4 w-4" />
            </a>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm text-cyan-50/90">
              <ShieldAlert className="h-4 w-4 text-amber-300" /> Research evidence not yet supplied
            </span>
          </div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-900/60 dark:bg-amber-950/25 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm dark:bg-slate-900 dark:text-amber-300"><FileSearch className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Research gate: primary evidence comes first</p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">The project brief says employee observations and interview evidence should be reviewed before company-specific diagnosis. Those images or notes have not been provided in this project yet, so no employee findings or Maersk-wide failures are asserted here.</p>
              <p className="mt-2 text-xs font-medium text-amber-900 dark:text-amber-200">Next input: upload the interview/observation images or paste your notes to start the problem register.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Central research question</p>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">Why do operational and organisational inefficiencies persist within Maersk despite its advanced AI capabilities, digital infrastructure, logistics technologies, and existing solutions?</p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard icon={<ClipboardList className="h-5 w-5" />} label="Project phases" value="10" detail="From primary evidence to executive recommendation" />
        <SummaryCard icon={<Lightbulb className="h-5 w-5" />} label="Decision principle" value="Solve the right problem" detail="Evaluate the tower; do not assume it is the answer" />
        <SummaryCard icon={<ShieldAlert className="h-5 w-5" />} label="Evidence standard" value="Traceable" detail="Separate verified facts, interpretations, and hypotheses" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Project workplan</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Investigation phases and deliverables</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Expandable outline · Findings remain unfilled until supported by evidence</p>
        </div>

        <div className="mt-5 space-y-3">
          {projectSections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSections.includes(section.number);
            return (
              <article key={section.number} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <button type="button" aria-expanded={isOpen} onClick={() => toggleSection(section.number)} className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[11px] font-bold tracking-widest text-slate-400">{section.number}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{section.title}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{section.label}</span>
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{section.summary}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/30 sm:px-5">
                    <ul className="space-y-2.5">
                      {section.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" />{point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Supporting questions</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Questions the analysis must answer</h2>
          <ol className="mt-4 space-y-3">
            {supportingQuestions.map((question, index) => (
              <li key={question} className="flex gap-3 text-sm leading-5 text-slate-700 dark:text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{index + 1}</span>{question}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Final report structure</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Executive consulting deliverable</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              'Executive summary & industry context',
              'Problem statement & employee evidence',
              'Verified technology landscape',
              'Digital capability–execution gap',
              'Root-cause & leadership diagnosis',
              'Tower product and architecture evaluation',
              'Transformation & change strategy',
              'Business case & scenario analysis',
              'Phased implementation roadmap',
              'KPIs, risks, and governance',
              'Final executive recommendation',
              'Evidence-backed diagrams and references',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-medium leading-5 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-700 dark:text-teal-300" />{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl border border-cyan-900/10 bg-[#eff8f6] p-5 dark:border-cyan-900/40 dark:bg-[#0b2930] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-800 dark:text-teal-300">Official reference link</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Maersk shipment and container tracking</h2>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-600 dark:text-slate-300">Use the official service to inspect its customer-facing tracking flow. Opening it does not connect this demo tower to Maersk systems or provide API access.</p>
        </div>
        <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0c6671] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#09545d] dark:bg-cyan-700 dark:hover:bg-cyan-600">
          Visit Maersk tracking <ExternalLink className="h-4 w-4" />
        </a>
      </section>

      <p className="px-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        This page is the project brief and evidence framework, not a completed consulting report. Company-specific conclusions, financial estimates, targets, and recommendations will only be added when supporting research is available.
      </p>
    </div>
  );
}

function SummaryCard({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p><p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{value}</p></div>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300">{icon}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{detail}</p>
    </div>
  );
}
