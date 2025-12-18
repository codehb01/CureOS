import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockQueue, mockAppointments } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, Clock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ReceptionistDashboard() {
  const navigate = useNavigate();

  const getWaitTime = (since: Date) => {
    const mins = Math.floor((Date.now() - since.getTime()) / 60000);
    return `${mins} min`;
  };

  return (
    <DashboardLayout role="receptionist" title="Reception Dashboard" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good Morning!</h1>
            <p className="text-muted-foreground">Here's what's happening today</p>
          </div>
          <Button onClick={() => navigate("/receptionist/register")} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Register Patient
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Today's Patients" value={42} icon={Users} trend={{ value: 12, positive: true }} />
          <StatCard title="Appointments" value={28} icon={Calendar} subtitle="8 upcoming" />
          <StatCard title="In Queue" value={mockQueue.length} icon={Clock} subtitle="Avg. wait: 18 min" />
          <StatCard title="New Registrations" value={7} icon={UserPlus} trend={{ value: 5, positive: true }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Current Queue</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/receptionist/queue")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {mockQueue.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {item.patientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.patientName}</p>
                      <p className="text-xs text-muted-foreground">{item.uhid}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={item.status} />
                    <p className="text-xs text-muted-foreground mt-1">{getWaitTime(item.waitingSince)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Today's Appointments</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/receptionist/appointments")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {mockAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-sm font-medium text-accent">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.doctorName}</p>
                    </div>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
