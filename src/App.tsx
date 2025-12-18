import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Receptionist pages
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import PatientRegistration from "./pages/receptionist/PatientRegistration";
import Appointments from "./pages/receptionist/Appointments";
import QueueManagement from "./pages/receptionist/QueueManagement";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import EMR from "./pages/doctor/EMR";

// Nurse pages
import NurseWardMap from "./pages/nurse/NurseWardMap";
import NurseTasks from "./pages/nurse/NurseTasks";
import NurseVitals from "./pages/nurse/NurseVitals";

// Pharmacy pages
import PharmacyDispensing from "./pages/pharmacy/PharmacyDispensing";
import PharmacyInventory from "./pages/pharmacy/PharmacyInventory";

// Lab pages
import LabTestQueue from "./pages/lab/LabTestQueue";
import LabResults from "./pages/lab/LabResults";

// Billing pages
import BillingDashboard from "./pages/billing/BillingDashboard";
import InsuranceProcessing from "./pages/billing/InsuranceProcessing";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Receptionist routes */}
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/register" element={<PatientRegistration />} />
          <Route path="/receptionist/appointments" element={<Appointments />} />
          <Route path="/receptionist/queue" element={<QueueManagement />} />
          
          {/* Doctor routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/emr" element={<EMR />} />
          
          {/* Nurse routes */}
          <Route path="/nurse" element={<NurseWardMap />} />
          <Route path="/nurse/tasks" element={<NurseTasks />} />
          <Route path="/nurse/vitals" element={<NurseVitals />} />
          
          {/* Pharmacy routes */}
          <Route path="/pharmacy" element={<PharmacyDispensing />} />
          <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
          
          {/* Lab routes */}
          <Route path="/lab" element={<LabTestQueue />} />
          <Route path="/lab/results" element={<LabResults />} />
          
          {/* Billing routes */}
          <Route path="/billing" element={<BillingDashboard />} />
          <Route path="/billing/insurance" element={<InsuranceProcessing />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
