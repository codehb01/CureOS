import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockQueue } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Clock, FileText, Stethoscope } from "lucide-react";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const getWaitTime = (since: Date) => {
    const mins = Math.floor((Date.now() - since.getTime()) / 60000);
    return `${mins} min`;
  };

  return (
    <DashboardLayout role="doctor" title="Doctor Dashboard" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dr. Amanda Chen</h1>
          <p className="text-muted-foreground">General Medicine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Patients Today" value={12} icon={Users} subtitle="5 remaining" />
          <StatCard title="Avg. Consult Time" value="18 min" icon={Clock} />
          <StatCard title="Pending Reports" value={3} icon={FileText} />
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">My Waiting Room</h3>
            </div>
            <span className="text-sm text-muted-foreground">{mockQueue.length} patients waiting</span>
          </div>

          <div className="space-y-3">
            {mockQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                    {item.patientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.patientName}</h4>
                    <p className="text-sm text-muted-foreground">{item.uhid}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-warning">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{getWaitTime(item.waitingSince)}</span>
                    </div>
                    <StatusBadge status={item.status} className="mt-1" />
                  </div>
                  <Button onClick={() => navigate("/doctor/emr")}>
                    Start Consult
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
