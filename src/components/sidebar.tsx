import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChartIcon,
  UserIcon,
  UsersIcon,
  UserRoundIcon,
  Users,
  CodeIcon,
  LayoutIcon,
  ClipboardListIcon,
  UserPlusIcon,
  PieChartIcon,
  DollarSignIcon,
  CalendarDaysIcon,
  BuildingIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarLogo = () => (
  <div className="flex items-center gap-2 px-4 py-6">
    <div className="w-10 h-10 rounded-md flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="font-semibold text-sm">Housing Mantra</span>
      <span className="text-xs text-muted-foreground">Super Admin</span>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, path, active, hasSubmenu }: { icon: any; label: string; path: string; active?: boolean; hasSubmenu?: boolean }) => (
  <Link href={path} className={cn("block", active && "bg-muted text-brandRed")}> 
    <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted transition-all duration-200">
      <Icon size={18} className={active ? "text-brandRed" : ""} />
      <span className={active ? "text-brandRed font-medium" : ""}>{label}</span>
      {hasSubmenu && (
        <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  </Link>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const path = usePathname();
  const isActive = (itemPath: string) => (itemPath === '/' ? path === '/' : path.startsWith(itemPath));

  const sidebarItems = [
    { icon: BarChartIcon, label: "Stats", path: "/stats" },
    { icon: UserIcon, label: "Admin", path: "/admin" },
    { icon: UsersIcon, label: "Agent", path: "/agent" },
    { icon: UserRoundIcon, label: "Owner", path: "/owner" },
    { icon: Users, label: "Team", path: "/team" },
    { icon: CodeIcon, label: "Developer", path: "/developer", hasSubmenu: true },
    { icon: LayoutIcon, label: "Project", path: "/", hasSubmenu: true },
    { icon: BuildingIcon, label: "Property", path: "/property" },
    { icon: ClipboardListIcon, label: "Listing", path: "/listing" },
    { icon: UserPlusIcon, label: "Leads", path: "/leads" },
    { icon: UserRoundIcon, label: "Customer", path: "/customer" },
    { icon: PieChartIcon, label: "Analytics", path: "/analytics" },
    { icon: DollarSignIcon, label: "Sales", path: "/sales" },
    { icon: DollarSignIcon, label: "Income Generated", path: "/income" },
    { icon: BuildingIcon, label: "Site Visit", path: "/site-visit" },
    { icon: CalendarDaysIcon, label: "Booking", path: "/booking" }
  ];

  return (
    <aside 
      className={`
        fixed md:static
        w-[280px] md:w-64
        h-screen
        bg-white
        border-r border-gray-200
        overflow-y-auto
        transition-transform duration-300
        z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <SidebarLogo />
      <div className="flex flex-col gap-1 px-3 py-4">
        {sidebarItems.map(({ icon, label, path, hasSubmenu }) => (
          <div key={path} onClick={() => onClose()}>
            <SidebarItem 
              icon={icon} 
              label={label} 
              path={path} 
              active={isActive(path)} 
              hasSubmenu={hasSubmenu} 
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
