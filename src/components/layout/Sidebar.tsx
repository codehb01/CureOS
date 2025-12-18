import { cn } from "@/lib/utils";
import { UserRole } from "@/types/hospital";
import {
  Users,
  Calendar,
  ClipboardList,
  Stethoscope,
  Activity,
  Pill,
  Package,
  TestTube,
  FileText,
  Receipt,
  CreditCard,
  LayoutDashboard,
  Settings,
  LogOut,
  Bed,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
}

const roleConfig: Record<UserRole, { title: string; icon: React.ReactNode; links: { href: string; label: string; icon: React.ReactNode }[] }> = {
  receptionist: {
    title: "Reception",
    icon: <Users className="h-5 w-5" />,
    links: [
      { href: "/receptionist", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      { href: "/receptionist/register", label: "New Patient", icon: <Users className="h-4 w-4" /> },
      { href: "/receptionist/appointments", label: "Appointments", icon: <Calendar className="h-4 w-4" /> },
      { href: "/receptionist/queue", label: "Queue", icon: <ClipboardList className="h-4 w-4" /> },
    ],
  },
  doctor: {
    title: "Doctor",
    icon: <Stethoscope className="h-5 w-5" />,
    links: [
      { href: "/doctor", label: "My Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      { href: "/doctor/emr", label: "EMR", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  nurse: {
    title: "Nursing",
    icon: <Heart className="h-5 w-5" />,
    links: [
      { href: "/nurse", label: "Ward Map", icon: <Bed className="h-4 w-4" /> },
      { href: "/nurse/tasks", label: "Tasks", icon: <ClipboardList className="h-4 w-4" /> },
      { href: "/nurse/vitals", label: "Vitals", icon: <Activity className="h-4 w-4" /> },
    ],
  },
  pharmacist: {
    title: "Pharmacy",
    icon: <Pill className="h-5 w-5" />,
    links: [
      { href: "/pharmacy", label: "Dispensing", icon: <Pill className="h-4 w-4" /> },
      { href: "/pharmacy/inventory", label: "Inventory", icon: <Package className="h-4 w-4" /> },
    ],
  },
  lab_technician: {
    title: "Laboratory",
    icon: <TestTube className="h-5 w-5" />,
    links: [
      { href: "/lab", label: "Test Queue", icon: <ClipboardList className="h-4 w-4" /> },
      { href: "/lab/results", label: "Enter Results", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  accountant: {
    title: "Billing",
    icon: <Receipt className="h-5 w-5" />,
    links: [
      { href: "/billing", label: "Final Billing", icon: <Receipt className="h-4 w-4" /> },
      { href: "/billing/insurance", label: "Insurance", icon: <CreditCard className="h-4 w-4" /> },
    ],
  },
  admin: {
    title: "Administration",
    icon: <Settings className="h-5 w-5" />,
    links: [
      { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      { href: "/admin/users", label: "User Management", icon: <Users className="h-4 w-4" /> },
      { href: "/admin/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
    ],
  },
};

export function Sidebar({ role, onLogout }: SidebarProps) {
  const location = useLocation();
  const config = roleConfig[role];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Activity className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">MediCare HMS</h1>
            <p className="text-xs text-sidebar-foreground/60">{config.title}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {config.links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              location.pathname === link.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
