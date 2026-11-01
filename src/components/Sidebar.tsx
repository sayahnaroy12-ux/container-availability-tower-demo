import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Package, Users, MapPin, Bell, Settings, Ship, Activity, Search, FileText } from 'lucide-react';
import { useSupplyChain } from '../store/SupplyChainContext';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Logistics Map', path: '/map', icon: Map },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Container Pipeline', path: '/container-pipeline', icon: Ship },
  { name: 'Suppliers', path: '/suppliers', icon: Users },
  { name: 'Location Manager', path: '/locations', icon: MapPin },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Transformation Project', path: '/transformation-project', icon: FileText },
  { name: 'Track Shipment', path: '/track-shipment', icon: Search },
];

export default function Sidebar() {
  const { userProfile } = useSupplyChain();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="w-64 bg-[#092c38] text-slate-300 flex flex-col h-full border-r border-[#174451]">
      <div className="px-5 py-6 flex items-center space-x-3 text-white">
        <div className="w-9 h-9 bg-[#c4f15b] rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
          <Ship className="w-5 h-5 text-[#103c3d]" />
        </div>
        <div><span className="block font-bold text-base tracking-tight">MEARSK TOWER</span><span className="mt-0.5 block text-[9px] font-semibold tracking-[0.18em] text-cyan-200/60">CONTAINER OPERATIONS</span></div>
      </div>
      
      <div className="px-6 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.17em] text-cyan-100/40">Workspace</div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'border border-cyan-300/15 bg-cyan-300/10 text-cyan-200 font-semibold shadow-sm shadow-black/10'
                    : 'border border-transparent text-slate-300/80 hover:bg-white/[0.06] hover:text-white'
                }`
              }
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[13px]">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="border-t border-[#174451] p-4">
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-cyan-100/10 bg-white/[0.04] px-3 py-2.5">
          <Activity className="h-4 w-4 text-[#c4f15b]" />
          <div><p className="text-[11px] font-semibold text-slate-200">Demo workspace</p><p className="text-[10px] text-slate-400">Sample data · not live connected</p></div>
        </div>
        <p className="mb-3 px-2 text-[10px] font-medium tracking-wide text-cyan-100/60">
          AI Tower built by Global Edge Consultants
        </p>
        {userProfile && (
          <NavLink to="/profile" className="flex items-center space-x-3 hover:bg-slate-800 p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
              {getInitials(userProfile.name)}
            </div>
            <div>
              <p className="text-sm font-medium text-white truncate max-w-[140px]">{userProfile.name}</p>
              <p className="text-xs text-slate-500 truncate max-w-[140px]">{userProfile.role}</p>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}
