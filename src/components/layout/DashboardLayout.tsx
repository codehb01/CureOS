import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { UserRole } from "@/types/hospital";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  title: string;
  onLogout: () => void;
}

export function DashboardLayout({ children, role, title, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} onLogout={onLogout} />
      <main className="ml-64">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-9 w-64 bg-secondary border-0"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
          </div>
        </header>
        <div className="p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
