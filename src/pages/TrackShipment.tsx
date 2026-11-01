import { useState, type FormEvent } from 'react';
import { ArrowDownToLine, ArrowUpRight, CheckCircle2, CircleHelp, Container, ExternalLink, Search, Ship, TriangleAlert } from 'lucide-react';
import { demoContainers, type ContainerStatus } from '../data/containerDemoData';

const MAERSK_TRACKING_URL = 'https://www.maersk.com/tracking/';
type TrackingType = 'container' | 'bill-of-lading';
type LookupResult = {
  kind: 'match' | 'not-found';
  query: string;
  status?: ContainerStatus;
  route?: string;
  eta?: string;
  details?: string;
};

const normalizeContainerNumber = (value: string) => value.toUpperCase().replace(/[\s-]/g, '');

export default function TrackShipment() {
  const [trackingType, setTrackingType] = useState<TrackingType>('container');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = trackingNumber.trim().toUpperCase();
    setError('');
    setResult(null);

    if (trackingType === 'container') {
      const normalizedQuery = normalizeContainerNumber(query);
      if (!/^[A-Z]{4}\d{7}$/.test(normalizedQuery)) {
        setError('Enter a container number with 4 letters followed by 7 digits.');
        return;
      }

      const match = demoContainers.find((container) => normalizeContainerNumber(container.id) === normalizedQuery);
      if (!match) {
        setResult({ kind: 'not-found', query });
        return;
      }

      setResult({
        kind: 'match',
        query: match.id,
        status: match.status,
        route: `${match.origin} → ${match.currentPort}${match.nextPort !== match.currentPort ? ` → ${match.nextPort}` : ''}`,
        eta: match.eta,
        details: match.note,
      });
      return;
    }

    if (!/^[A-Z0-9]{9}$/.test(query)) {
      setError('Enter a 9-character bill of lading number.');
      return;
    }
    setResult({ kind: 'not-found', query });
  };

  const statusTone: Record<ContainerStatus, string> = {
    Available: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    Expected: 'bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    Reserved: 'bg-violet-50 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
    Unavailable: 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    'In transit': 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-300"><Ship className="h-4 w-4" />Shipment visibility</div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Track a shipment</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Look up a sample container or continue to Maersk’s official tracking service.</p>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-br from-[#082d3b] via-[#0b4b58] to-[#0c6671] px-6 py-7 text-white sm:px-9 sm:py-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c4f15b] text-[#103c3d]"><Search className="h-6 w-6" /></div>
          <h2 className="mt-5 text-xl font-bold sm:text-2xl">Find a container movement</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-cyan-50/75">Search the sample records included with this demo. For live carrier milestones, use Maersk’s official tracking page below.</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-5 p-6 sm:p-9">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">Search by</legend>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <button type="button" aria-pressed={trackingType === 'container'} onClick={() => { setTrackingType('container'); setError(''); setResult(null); }} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${trackingType === 'container' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>
                Container number
              </button>
              <button type="button" aria-pressed={trackingType === 'bill-of-lading'} onClick={() => { setTrackingType('bill-of-lading'); setError(''); setResult(null); }} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${trackingType === 'bill-of-lading' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>
                Bill of lading
              </button>
            </div>
          </fieldset>

          <div>
            <label htmlFor="tracking-number" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              {trackingType === 'container' ? 'Container number' : 'Bill of lading number'}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Container className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="tracking-number"
                  name="tracking-number"
                  autoComplete="off"
                  value={trackingNumber}
                  onChange={(event) => { setTrackingNumber(event.target.value); setError(''); }}
                  placeholder={trackingType === 'container' ? 'e.g. MSCU4812057' : 'Enter 9-character number'}
                  aria-describedby={error ? 'tracking-error' : 'tracking-hint'}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm font-medium uppercase tracking-wide text-slate-900 outline-none transition placeholder:normal-case placeholder:tracking-normal focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c6671] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#09545d] focus:outline-none focus:ring-4 focus:ring-cyan-700/20 dark:bg-cyan-700 dark:hover:bg-cyan-600">
                <Search className="h-4 w-4" />Search
              </button>
            </div>
            {error ? <p id="tracking-error" role="alert" className="mt-2 text-sm font-medium text-rose-700 dark:text-rose-300">{error}</p> : (
              <p id="tracking-hint" className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <CircleHelp className="h-3.5 w-3.5" />
                {trackingType === 'container' ? 'Use 4 letters and 7 digits. Spaces and hyphens are accepted.' : 'Use the 9-character bill of lading number.'}
              </p>
            )}
          </div>

          {result && (
            <div aria-live="polite">
              {result.kind === 'match' ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                      <div><p className="text-sm font-bold text-slate-900 dark:text-white">Sample container found</p><p className="mt-0.5 font-mono text-sm text-slate-600 dark:text-slate-300">{result.query}</p></div>
                    </div>
                    {result.status && <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone[result.status]}`}>{result.status}</span>}
                  </div>
                  <dl className="mt-4 grid gap-3 border-t border-emerald-200 pt-4 text-sm dark:border-emerald-900 sm:grid-cols-2">
                    <div><dt className="text-xs font-medium text-slate-500 dark:text-slate-400">Route</dt><dd className="mt-1 font-medium text-slate-800 dark:text-slate-200">{result.route}</dd></div>
                    <div><dt className="text-xs font-medium text-slate-500 dark:text-slate-400">ETA / availability</dt><dd className="mt-1 font-medium text-slate-800 dark:text-slate-200">{result.eta}</dd></div>
                    <div className="sm:col-span-2"><dt className="text-xs font-medium text-slate-500 dark:text-slate-400">Note</dt><dd className="mt-1 text-slate-700 dark:text-slate-300">{result.details}</dd></div>
                  </dl>
                </div>
              ) : (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
                  <div><p className="text-sm font-bold text-slate-900 dark:text-white">No match in the demo records</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">“{result.query}” isn’t in this sample dataset. The lookup stays in this app; use Maersk’s official page for live shipment information.</p></div>
                </div>
              )}
            </div>
          )}
        </form>

        <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-5 dark:border-slate-800 dark:bg-slate-950/40 sm:px-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Need live Maersk tracking?</p>
              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400">Open Maersk’s official tracker and enter your container or bill of lading number there. This demo does not send your search or retrieve carrier data.</p>
            </div>
            <a href={MAERSK_TRACKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-800/20 bg-white px-4 py-3 text-sm font-bold text-cyan-900 transition hover:border-cyan-700 hover:bg-cyan-50 dark:border-cyan-700/50 dark:bg-slate-900 dark:text-cyan-200 dark:hover:bg-slate-800">
              Maersk live tracking <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <p className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        <ArrowDownToLine className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Sample lookups show illustrative records only; ETAs and status aren’t live. Use the official Maersk service for current shipment milestones.
      </p>
    </div>
  );
}
