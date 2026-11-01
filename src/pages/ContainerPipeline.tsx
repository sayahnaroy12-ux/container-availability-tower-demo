import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, ArrowRightLeft, CheckCircle2, Clock3, MapPin, Package, RefreshCw, Search, Ship } from 'lucide-react';
import { demoContainers, demoPorts } from '../data/containerDemoData';
import type { ContainerStatus } from '../data/containerDemoData';

const statusStyles: Record<ContainerStatus, string> = {
  Available: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Expected: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Reserved: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Unavailable: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  'In transit': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

const formatCheckedTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export default function ContainerPipeline() {
  const [lastChecked, setLastChecked] = useState(() => new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPort, setSelectedPort] = useState('All ports');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');

  useEffect(() => {
    if (!autoRefresh) return;
    const timer = window.setInterval(() => setLastChecked(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, [autoRefresh]);

  const filteredContainers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return demoContainers.filter((container) => {
      const matchesPort = selectedPort === 'All ports' || container.currentPort === selectedPort || container.nextPort === selectedPort;
      const matchesStatus = selectedStatus === 'All statuses' || container.status === selectedStatus;
      const matchesSearch = !query || [container.id, container.origin, container.currentPort, container.nextPort, container.note]
        .some((value) => value.toLowerCase().includes(query));
      return matchesPort && matchesStatus && matchesSearch;
    });
  }, [search, selectedPort, selectedStatus]);

  const totalContainers = demoPorts.reduce((total, port) => total + port.available + port.expected + port.reserved + port.unavailable, 0);
  const totalAvailable = demoPorts.reduce((total, port) => total + port.available, 0);
  const totalExpected = demoPorts.reduce((total, port) => total + port.expected, 0);
  const shortagePorts = demoPorts.filter((port) => port.available < port.sevenDayDemand);
  const surplusPorts = demoPorts.filter((port) => port.available > port.sevenDayDemand);
  const suggestedMoves = Math.min(
    shortagePorts.reduce((total, port) => total + port.sevenDayDemand - port.available, 0),
    surplusPorts.reduce((total, port) => total + port.available - port.sevenDayDemand, 0),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"><Ship className="h-4 w-4" />Container operations</div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Container availability pipeline</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Port inventory, upcoming arrivals, and customer-ready equipment in one view.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock3 className="h-4 w-4" />Demo snapshot checked {formatCheckedTime(lastChecked)}</span>
          <button type="button" onClick={() => setLastChecked(new Date())} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <RefreshCw className="h-4 w-4" />Refresh
          </button>
          <button type="button" aria-pressed={autoRefresh} onClick={() => setAutoRefresh((enabled) => !enabled)} className={`rounded-lg px-3 py-2 text-sm font-medium ${autoRefresh ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
            Auto-check {autoRefresh ? 'on' : 'off'}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200">
        <strong>Demo data:</strong> port totals and container movements are seeded examples. Refresh and 30-second auto-check update the check time only; no live carrier or port feed is connected.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={<Package className="h-5 w-5" />} label="Containers across ports" value={totalContainers.toLocaleString()} accent="blue" />
        <KpiCard icon={<CheckCircle2 className="h-5 w-5" />} label="Available now" value={totalAvailable.toLocaleString()} accent="emerald" detail="Usable and unreserved" />
        <KpiCard icon={<Ship className="h-5 w-5" />} label="Expected arrivals" value={totalExpected.toLocaleString()} accent="violet" detail="Arrival within 7 days" />
        <KpiCard icon={<AlertTriangle className="h-5 w-5" />} label="Ports below demand" value={shortagePorts.length.toString()} accent="amber" detail="Compared with next 7 days" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <div className="flex flex-col gap-2 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Port availability</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Equipment counts by current state and estimated 7-day demand</p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Seeded inventory snapshot</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Port</th><th className="px-4 py-3 text-right font-medium">Available</th><th className="px-4 py-3 text-right font-medium">Expected</th><th className="px-4 py-3 text-right font-medium">Reserved</th><th className="px-4 py-3 text-right font-medium">Unavailable</th><th className="px-5 py-3 text-right font-medium">7-day demand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {demoPorts.map((port) => {
                  const shortfall = port.sevenDayDemand - port.available;
                  return (
                    <tr key={port.name} className="text-slate-700 dark:text-slate-300">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><MapPin className="h-4 w-4" /></span>
                          <span><span className="block font-medium text-slate-900 dark:text-white">{port.name}</span><span className="text-xs text-slate-500">{port.country}</span></span>
                        </div>
                      </td>
                      <td className={`px-4 py-4 text-right font-semibold ${shortfall > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{port.available}</td>
                      <td className="px-4 py-4 text-right">{port.expected}</td><td className="px-4 py-4 text-right">{port.reserved}</td><td className="px-4 py-4 text-right">{port.unavailable}</td>
                      <td className="px-5 py-4 text-right"><span className="font-medium">{port.sevenDayDemand}</span><span className={`ml-2 text-xs ${shortfall > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{shortfall > 0 ? `${shortfall} short` : `${Math.abs(shortfall)} surplus`}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2"><ArrowRightLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" /><h2 className="font-semibold text-slate-900 dark:text-white">Repositioning opportunities</h2></div>
          {shortagePorts.length > 0 && surplusPorts.length > 0 ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">{shortagePorts.map((port) => port.name).join(', ')} projected gap</p>
                {shortagePorts.map((port) => <p key={port.name} className="mt-1 text-sm text-amber-800 dark:text-amber-300">{port.name}: {port.sevenDayDemand - port.available} below estimated 7-day demand before expected arrivals.</p>)}
              </div>
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Review up to {suggestedMoves} repositioning moves</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{surplusPorts.map((port) => port.name).join(' and ')} have usable stock above their 7-day demand. Review equipment type, vessel space, arrival dates, and actual bookings before moving stock to shortage ports.</p>
              </div>
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Planning suggestion only. This compares seeded usable stock with seeded demand; it does not reserve equipment, account for transit time, or book transport.</p>
            </div>
          ) : <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">No current repositioning gap in the seeded port snapshot.</p>}
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
          <div><h2 className="font-semibold text-slate-900 dark:text-white">Container pipeline report</h2><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sample container movements with current status, route, and estimated availability</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search container or port" aria-label="Search containers or ports" className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-blue-400 sm:w-56 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            <select value={selectedPort} onChange={(event) => setSelectedPort(event.target.value)} aria-label="Filter by port" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <option>All ports</option>{demoPorts.map((port) => <option key={port.name}>{port.name}</option>)}
            </select>
            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} aria-label="Filter by container status" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <option>All statuses</option>{(['Available', 'Expected', 'Reserved', 'Unavailable', 'In transit'] as ContainerStatus[]).map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"><tr>
              <th className="px-5 py-3 font-medium">Container</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Origin</th><th className="px-4 py-3 font-medium">Current port</th><th className="px-4 py-3 font-medium">Next port</th><th className="px-5 py-3 font-medium">ETA / availability</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredContainers.map((container) => (
                <tr key={container.id} className="text-slate-600 dark:text-slate-300">
                  <td className="px-5 py-4"><span className="block font-medium text-slate-900 dark:text-white">{container.id}</span><span className="text-xs text-slate-500">{container.size}</span></td>
                  <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[container.status]}`}>{container.status}</span></td>
                  <td className="px-4 py-4">{container.origin}</td><td className="px-4 py-4">{container.currentPort}</td><td className="px-4 py-4">{container.nextPort}</td>
                  <td className="px-5 py-4"><span className="block font-medium text-slate-800 dark:text-slate-200">{container.eta}</span><span className="text-xs text-slate-500">{container.note}</span></td>
                </tr>
              ))}
              {filteredContainers.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">No containers match these filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">Showing {filteredContainers.length} of {demoContainers.length} sample movements. ETAs are illustrative and should be confirmed with the operating carrier.</div>
      </section>
    </div>
  );
}

function KpiCard({ icon, label, value, accent, detail }: { icon: ReactNode; label: string; value: string; accent: 'blue' | 'emerald' | 'violet' | 'amber'; detail?: string }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors[accent]}`}>{icon}</span>
      <div className="min-w-0"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p><p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>{detail && <p className="text-xs text-slate-500 dark:text-slate-400">{detail}</p>}</div>
    </div>
  );
}
