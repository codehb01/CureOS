import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockQueue, mockDoctors } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, Users } from "lucide-react";
import { useState } from "react";

export default function QueueManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [queue, setQueue] = useState(mockQueue);

  const getWaitTime = (since: Date) => {
    const mins = Math.floor((Date.now() - since.getTime()) / 60000);
    return `${mins} min`;
  };

  const handleCheckIn = (id: string, patientName: string) => {
    setQueue(queue.filter((q) => q.id !== id));
    toast({
      title: "Patient Checked In",
      description: `${patientName} has been moved to the doctor's waiting room.`,
    });
  };

  return (
    <DashboardLayout role="receptionist" title="Queue Management" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lobby Queue</h1>
            <p className="text-muted-foreground">Patients waiting in the lobby</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{queue.length} patients waiting</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {queue.length === 0 ? (
              <Card className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-1">Queue Empty</h3>
                <p className="text-sm text-muted-foreground">No patients currently waiting in the lobby</p>
              </Card>
            ) : (
              queue.map((item, index) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{item.patientName}</h3>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.uhid}</p>
                    </div>
                    <div className="text-right mr-4">
                      <div className="flex items-center gap-1 text-warning">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{getWaitTime(item.waitingSince)}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleCheckIn(item.id, item.patientName)}>
                      Check-In
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          <Card className="p-5 h-fit">
            <h3 className="font-semibold text-foreground mb-4">Available Doctors</h3>
            <div className="space-y-3">
              {mockDoctors.map((doctor) => (
                <div key={doctor.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
