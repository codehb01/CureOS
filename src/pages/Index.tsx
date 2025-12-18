import { UserRole } from "@/types/hospital";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Stethoscope,
  Heart,
  Pill,
  TestTube,
  Receipt,
  Settings,
  Activity,
} from "lucide-react";

const roles: { role: UserRole; label: string; icon: React.ReactNode; path: string; description: string }[] = [
  { role: "receptionist", label: "Receptionist", icon: <Users className="h-6 w-6" />, path: "/receptionist", description: "Patient registration & scheduling" },
  { role: "doctor", label: "Doctor", icon: <Stethoscope className="h-6 w-6" />, path: "/doctor", description: "Consultations & EMR" },
  { role: "nurse", label: "Nurse", icon: <Heart className="h-6 w-6" />, path: "/nurse", description: "Ward management & vitals" },
  { role: "pharmacist", label: "Pharmacist", icon: <Pill className="h-6 w-6" />, path: "/pharmacy", description: "Dispensing & inventory" },
  { role: "lab_technician", label: "Lab Technician", icon: <TestTube className="h-6 w-6" />, path: "/lab", description: "Tests & results" },
  { role: "accountant", label: "Accountant", icon: <Receipt className="h-6 w-6" />, path: "/billing", description: "Billing & insurance" },
  { role: "admin", label: "Administrator", icon: <Settings className="h-6 w-6" />, path: "/admin", description: "System management" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-foreground">MediCare HMS</h1>
            <p className="text-xs text-muted-foreground">Hospital Management System</p>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Welcome Back</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select your role to access the hospital management dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {roles.map(({ role, label, icon, path, description }) => (
            <button
              key={role}
              onClick={() => navigate(path)}
              className="group glass-card rounded-xl p-6 text-left hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {icon}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{label}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </button>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-4">
        <p className="text-center text-sm text-muted-foreground">
          © 2024 MediCare HMS. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
