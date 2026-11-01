import { useState } from 'react';
import type { ReactNode } from 'react';
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, ArrowUpRightFromCircle, CheckCircle2, Clock3, Container, MapPin, RefreshCw, Ship, Sparkles, TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { demoContainers, demoPorts } from '../data/containerDemoData';

const formatCheckedTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function Dashboard() {
  const [lastChecked, setLastChecked] = useState(() => new Date());
  const navigate = useNavigate();

  const availableCount = demoPorts.reduce((sum, port) => sum + port.available, 0);
  const expectedCount = demoPorts.reduce((sum, port) => sum + port.expected, 0);
  const totalDemand = demoPorts.reduce((sum, port) => sum + port.sevenDayDemand, 0);
  const networkTotal = demoPorts.reduce((sum, port) => sum + port.available + port.expected + port.reserved + port.unavailable, 0);
  const networkCoverage = Math.round((availableCount / totalDemand) * 100);
  const shortagePorts = demoPorts.filter((port) => port.available < port.sevenDayDemand);
  const surplusPorts = demoPorts.filter((port) => port.available > port.sevenDayDemand);
  const singapore = demoPorts.find((port) => port.name === 'Singapore');
  const candidateMoves = Math.min(
    shortagePorts.reduce((sum, port) => sum + port.sevenDayDemand - port.available, 0),
    surplusPorts.reduce((sum, port) => sum + port.available - port.sevenDayDemand, 0),
  );
  const movementLabel: Record<string, string> = {
    Available: 'Available for allocation',
    Expected: 'Arrival expected',
    Reserved: 'Reserved for booking',
    Unavailable: 'Release date unconfirmed',
    'In transit': 'On the move',
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            Container operations · Demo environment
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Container availability</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Today's view: balance equipment before it becomes a customer booking problem.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock3 className="h-4 w-4" />Checked {formatCheckedTime(lastChecked)}</span>
          <button type="button" onClick={() => setLastChecked(new Date())} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-700">
            <RefreshCw className="h-4 w-4" />Refresh
          </button>
        </div>
      </header>

      <section className="relative isolate overflow-hidden rounded-[28px] bg-[#082d3b] text-white shadow-xl shadow-cyan-950/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_74%_12%,rgba(34,211,238,0.27),transparent_38%),linear-gradient(112deg,#082d3b_3%,#0a4050_62%,#076478_100%)]" />
        <div className="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full border border-cyan-100/10" />
        <div className="absolute -right-5 -top-16 -z-10 h-52 w-52 rounded-full border border-cyan-100/10" />
        <div className="grid min-h-[300px] items-center gap-4 px-6 py-7 sm:px-9 sm:py-8 lg:grid-cols-[1.05fr_.95fr] lg:px-11">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-cyan-100">
              <Activity className="h-3.5 w-3.5" /> NETWORK AVAILABILITY
            </span>
            <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">The right container.<br /><span className="text-cyan-300">At the right port.</span></h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-cyan-50/75">See where equipment is usable, what is arriving, and which ports need attention before the next demand window.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => navigate('/container-pipeline')} className="inline-flex items-center gap-2 rounded-xl bg-[#c4f15b] px-4 py-2.5 text-sm font-bold text-[#102b24] shadow-lg shadow-black/10 transition hover:bg-[#d2ff78]">
                Open container pipeline <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-xs text-cyan-100/65">Sample network · 3 ports</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[550px]" aria-label="Illustration of container vessels connecting three ports">
            <svg className="h-auto w-full overflow-visible" viewBox="0 0 560 280" role="img" aria-labelledby="fleet-graphic-title">
              <title id="fleet-graphic-title">Illustrated vessel and port connections</title>
              <defs>
                <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#0d5666" stopOpacity=".4" />
                  <stop offset="1" stopColor="#0a2837" stopOpacity=".05" />
                </linearGradient>
                <linearGradient id="ship-hull" x1="0" x2="1">
                  <stop offset="0" stopColor="#c5f15d" />
                  <stop offset="1" stopColor="#71d7c5" />
                </linearGradient>
                <pattern id="water-grid" width="30" height="22" patternUnits="userSpaceOnUse">
                  <path d="M0 21.5H30" stroke="#a7eff2" strokeOpacity=".12" />
                </pattern>
              </defs>
              <ellipse cx="288" cy="248" rx="240" ry="19" fill="url(#sea)" />
              <path d="M22 215 Q280 187 538 217 L538 260 Q276 238 22 266Z" fill="url(#water-grid)" opacity=".8" />
              <path d="M96 187 C194 93 321 95 453 164" fill="none" stroke="#73e6da" strokeDasharray="5 8" strokeOpacity=".65" strokeWidth="2" />
              <path d="M120 198 C210 232 330 228 438 185" fill="none" stroke="#c7f263" strokeDasharray="3 8" strokeOpacity=".55" strokeWidth="1.5" />
              <g transform="translate(48 77)">
                <circle cx="45" cy="44" r="31" fill="#53d5d0" fillOpacity=".08" />
                <circle cx="45" cy="44" r="19" fill="#53d5d0" fillOpacity=".13" />
                <circle cx="45" cy="44" r="6" fill="#c7f263" />
                <text x="45" y="12" fill="#e2fbf8" textAnchor="middle" fontSize="11" fontWeight="600">ROTTERDAM</text>
              </g>
              <g transform="translate(416 91)">
                <circle cx="45" cy="44" r="31" fill="#53d5d0" fillOpacity=".08" />
                <circle cx="45" cy="44" r="19" fill="#53d5d0" fillOpacity=".13" />
                <circle cx="45" cy="44" r="6" fill="#f3bf66" />
                <text x="45" y="12" fill="#e2fbf8" textAnchor="middle" fontSize="11" fontWeight="600">SINGAPORE</text>
              </g>
              <g transform="translate(221 14)">
                <circle cx="45" cy="44" r="31" fill="#53d5d0" fillOpacity=".08" />
                <circle cx="45" cy="44" r="19" fill="#53d5d0" fillOpacity=".13" />
                <circle cx="45" cy="44" r="6" fill="#c7f263" />
                <text x="45" y="12" fill="#e2fbf8" textAnchor="middle" fontSize="11" fontWeight="600">LOS ANGELES</text>
              </g>
              <g transform="translate(147 146)">
                <path d="M0 69 L23 96 H271 L303 69Z" fill="url(#ship-hull)" />
                <path d="M18 65 H288 L274 83 H32Z" fill="#f2f8f2" />
                <path d="M242 45h28v20h-28z" fill="#b9ede2" />
                <path d="M265 51h14v14h-14z" fill="#86d8d1" />
                <path d="M12 48h38v17H12z" fill="#ea6e53" /><path d="M53 48h38v17H53z" fill="#eea746" />
                <path d="M94 48h38v17H94z" fill="#3ba9a4" /><path d="M135 48h38v17h-38z" fill="#d96850" />
                <path d="M176 48h38v17h-38z" fill="#e8aa51" /><path d="M217 48h38v17h-38z" fill="#349b9e" />
                <path d="M32 29h38v17H32z" fill="#e2a247" /><path d="M73 29h38v17H73z" fill="#e86b51" />
                <path d="M114 29h38v17h-38z" fill="#39aaa0" /><path d="M155 29h38v17h-38z" fill="#e0a14a" />
                <path d="M196 29h38v17h-38z" fill="#dc6a50" />
                <path d="M74 10h38v17H74z" fill="#3ba9a4" /><path d="M115 10h38v17h-38z" fill="#e2a247" />
                <path d="M156 10h38v17h-38z" fill="#e86b51" />
                <path d="M0 108q16-10 32 0t32 0t32 0t32 0t32 0t32 0t32 0t32 0t32 0t32 0" fill="none" stroke="#72e5db" strokeOpacity=".7" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/10 px-6 py-3 text-xs text-cyan-50/70 sm:px-9 lg:px-11">
          <span>Illustrative network view · Not live vessel tracking</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#c7f263]" /> Scenario data refreshed {formatCheckedTime(lastChecked)}</span>
        </div>
      </section>

      <section aria-label="Network performance indicators" className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <MetricCard label="Containers at tracked ports" value={networkTotal.toLocaleString()} detail="Across 3 demo ports" icon={<Container className="h-5 w-5" />} tone="teal" />
        <MetricCard label="Usable right now" value={availableCount.toLocaleString()} detail="Unreserved · available at port" icon={<CheckCircle2 className="h-5 w-5" />} tone="lime" />
        <MetricCard label="Expected arrivals" value={expectedCount.toLocaleString()} detail="Estimated within 7 days" icon={<Ship className="h-5 w-5" />} tone="blue" />
        <MetricCard label="Ports needing attention" value={shortagePorts.length.toLocaleString()} detail={`${shortagePorts.length} short · ${surplusPorts.length} with surplus`} icon={<TriangleAlert className="h-5 w-5" />} tone={shortagePorts.length > 0 ? 'amber' : 'lime'} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.18fr_.82fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"><MapPin className="h-3.5 w-3.5" />Port readiness</div>
              <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Where equipment can meet demand</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Available stock compared with seeded 7-day demand</p>
            </div>
            <button type="button" onClick={() => navigate('/container-pipeline')} className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-800 transition hover:text-cyan-600 dark:text-cyan-300">
              Port report <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {demoPorts.map((port, index) => {
              const isShort = port.available < port.sevenDayDemand;
              const coverage = Math.round((port.available / port.sevenDayDemand) * 100);
              const width = Math.min(coverage, 100);
              return (
                <div key={port.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${index === 0 ? 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300' : index === 1 ? 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'}`}>{port.name.slice(0, 1)}</span>
                      <span className="truncate"><span className="block text-sm font-semibold text-slate-900 dark:text-white">{port.name}</span><span className="text-xs text-slate-500 dark:text-slate-400">{port.country}</span></span>
                    </div>
                    <div className="text-right">
                      <span className={`block text-sm font-bold ${isShort ? 'text-amber-700 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'}`}>{port.available} usable</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{isShort ? `${port.sevenDayDemand - port.available} below demand` : `${port.available - port.sevenDayDemand} above demand`}</span>
                    </div>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full transition-all ${isShort ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-teal-500 to-emerald-400'}`} style={{ width: `${width}%` }} />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-slate-400"><span>0</span><span>{coverage}% of demand · {port.sevenDayDemand} needed</span></div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-[#f1f8f6] p-4 dark:bg-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Network coverage</span>
              <div className="mt-1 flex items-baseline gap-2"><strong className="text-2xl font-bold text-slate-900 dark:text-white">{networkCoverage}%</strong><span className="text-xs text-slate-500 dark:text-slate-400">of 7-day demand in usable stock</span></div>
            </div>
            <div className="max-w-sm text-xs leading-5 text-slate-600 dark:text-slate-300">Network total can hide local shortages: Singapore is {singapore ? Math.max(singapore.sevenDayDemand - singapore.available, 0) : 0} containers below its demand estimate before arrivals.</div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"><Sparkles className="h-3.5 w-3.5 text-teal-600" />Planning signal</div>
              <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Rebalance before the gap grows</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">A review prompt based on current demo counts</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">REVIEW</span>
          </div>
          <div className="mx-5 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/70 p-4 dark:border-amber-900/50 dark:from-amber-950/50 dark:to-slate-900 sm:mx-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm dark:bg-slate-900 dark:text-amber-300"><ArrowDownRight className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{shortagePorts.map((port) => port.name).join(', ')} projected shortfall</p>
                <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">{shortagePorts.map((port) => `${port.name} is ${port.sevenDayDemand - port.available} below estimated 7-day demand`).join('. ')}. {surplusPorts.map((port) => port.name).join(' and ')} show usable stock above local demand.</p>
              </div>
            </div>
          </div>
          <div className="mx-5 mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70 sm:mx-6">
            <div><span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Review from</span><p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{surplusPorts.map((port) => port.name).join(' / ')}</p><p className="text-xs text-slate-500 dark:text-slate-400">Combined 16 above demand</p></div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
            <div><span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Review for</span><p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{shortagePorts.map((port) => port.name).join(', ')}</p><p className="text-xs text-slate-500 dark:text-slate-400">Up to {candidateMoves} units in gap</p></div>
          </div>
          <div className="mt-auto p-5 pt-4 sm:px-6 sm:pb-6">
            <p className="mb-3 text-xs leading-5 text-slate-500 dark:text-slate-400">Not an automated move. Validate container size, bookings, transit time, handling capacity, and cost before taking action.</p>
            <button type="button" onClick={() => navigate('/container-pipeline')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0c6671] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#09545d] dark:bg-cyan-700 dark:hover:bg-cyan-600">
              Review pipeline & availability <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[.8fr_1.2fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3 p-5 sm:p-6">
            <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"><Activity className="h-3.5 w-3.5" />Lane overview</div><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Connected port network</h2></div>
            <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">SCENARIO</span>
          </div>
          <div className="px-4 pb-2 sm:px-6">
            <svg className="h-[188px] w-full" viewBox="0 0 500 205" role="img" aria-label="Illustrative routes between Rotterdam, Singapore, and Los Angeles">
              <defs><pattern id="map-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#aab9bd" fillOpacity=".45" /></pattern></defs>
              <rect width="500" height="190" rx="20" fill="url(#map-dots)" />
              <path d="M75 132 C163 29 302 37 405 112" fill="none" stroke="#18a99c" strokeDasharray="5 7" strokeWidth="2" />
              <path d="M83 135 C174 169 311 156 402 114" fill="none" stroke="#e9a43c" strokeDasharray="4 7" strokeWidth="2" />
              <path d="M79 126 C125 60 196 42 247 59" fill="none" stroke="#57b9dd" strokeDasharray="4 7" strokeWidth="2" />
              <g><circle cx="75" cy="132" r="18" fill="#16a394" fillOpacity=".12" /><circle cx="75" cy="132" r="8" fill="#168b80" /><circle cx="75" cy="132" r="3" fill="white" /></g>
              <g><circle cx="405" cy="112" r="18" fill="#e5a13e" fillOpacity=".16" /><circle cx="405" cy="112" r="8" fill="#d9962e" /><circle cx="405" cy="112" r="3" fill="white" /></g>
              <g><circle cx="247" cy="59" r="18" fill="#56b6dc" fillOpacity=".14" /><circle cx="247" cy="59" r="8" fill="#2997c2" /><circle cx="247" cy="59" r="3" fill="white" /></g>
              <text x="43" y="168" fill="currentColor" className="fill-slate-600 dark:fill-slate-300" fontSize="11" fontWeight="600">ROTTERDAM</text>
              <text x="377" y="146" fill="currentColor" className="fill-slate-600 dark:fill-slate-300" fontSize="11" fontWeight="600">SINGAPORE</text>
              <text x="206" y="31" fill="currentColor" className="fill-slate-600 dark:fill-slate-300" fontSize="11" fontWeight="600">LOS ANGELES</text>
            </svg>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
            <LegendDot color="bg-teal-600" label="Rotterdam · 42 available" /><LegendDot color="bg-amber-500" label="Singapore · 16 available" /><LegendDot color="bg-sky-500" label="Los Angeles · 28 available" />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
            <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400"><Ship className="h-3.5 w-3.5" />Movement watch</div><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Containers on the pipeline</h2></div>
            <button type="button" onClick={() => navigate('/container-pipeline')} className="inline-flex items-center gap-1 pt-1 text-sm font-semibold text-cyan-800 hover:text-cyan-600 dark:text-cyan-300">Full report <ArrowUpRightFromCircle className="h-4 w-4" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-y border-slate-100 bg-slate-50/80 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:border-slate-800 dark:bg-slate-800/40">
                <tr><th className="px-5 py-3">Container</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Next port</th><th className="px-5 py-3">ETA</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {demoContainers.slice(0, 4).map((container) => (
                  <tr key={container.id} className="text-slate-600 dark:text-slate-300">
                    <td className="px-5 py-3.5"><span className="block font-semibold text-slate-800 dark:text-white">{container.id}</span><span className="text-xs text-slate-400">{container.size}</span></td>
                    <td className="px-4 py-3.5"><span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold ${container.status === 'Available' ? 'text-emerald-700 dark:text-emerald-300' : container.status === 'Expected' ? 'text-blue-700 dark:text-blue-300' : container.status === 'Reserved' ? 'text-violet-700 dark:text-violet-300' : 'text-amber-700 dark:text-amber-300'}`}><span className={`h-1.5 w-1.5 rounded-full ${container.status === 'Available' ? 'bg-emerald-500' : container.status === 'Expected' ? 'bg-blue-500' : container.status === 'Reserved' ? 'bg-violet-500' : 'bg-amber-500'}`} />{movementLabel[container.status]}</span></td>
                    <td className="px-4 py-3.5">{container.nextPort}</td><td className="px-5 py-3.5 text-xs font-medium text-slate-500 dark:text-slate-400">{container.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4 text-xs text-slate-500 dark:text-slate-400 sm:px-6">
            <span>Illustrative sample movements · Verify carrier milestones</span><span className="inline-flex items-center gap-1"><ArrowUpRight className="h-3.5 w-3.5" />8 records</span>
          </div>
        </div>
      </section>

      <p className="border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Demo scenario only. No live port, carrier, booking, or predictive service is connected. Coverage is available containers divided by estimated 7-day demand; it is not a customer success or on-time delivery rate. Expected arrivals, transit time, equipment compatibility, and port handling constraints need operational validation.
      </p>
    </div>
  );
}

function MetricCard({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: ReactNode; tone: 'teal' | 'lime' | 'blue' | 'amber' }) {
  const tones = {
    teal: 'bg-teal-50 text-teal-800 ring-teal-100 dark:bg-teal-950/70 dark:text-teal-300 dark:ring-teal-900',
    lime: 'bg-lime-50 text-lime-800 ring-lime-100 dark:bg-lime-950/70 dark:text-lime-300 dark:ring-lime-900',
    blue: 'bg-sky-50 text-sky-800 ring-sky-100 dark:bg-sky-950/70 dark:text-sky-300 dark:ring-sky-900',
    amber: 'bg-amber-50 text-amber-800 ring-amber-100 dark:bg-amber-950/70 dark:text-amber-300 dark:ring-amber-900',
  };
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p></div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}>{icon}</span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-teal-500" />{detail}</div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400"><span className={`h-2 w-2 rounded-full ${color}`} />{label}</span>;
}
