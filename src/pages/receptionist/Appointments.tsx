import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockAppointments, mockDoctors, mockPatients } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Appointments() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM"];

  const handleCreateAppointment = () => {
    toast({
      title: "Appointment Created",
      description: `Appointment scheduled successfully.`,
    });
  };

  return (
    <DashboardLayout role="receptionist" title="Appointments" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Appointment Scheduler</h1>
            <p className="text-muted-foreground">Manage patient appointments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Appointment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Select Patient</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPatients.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name} ({p.uhid})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.name} - {d.specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Time Slot</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleCreateAppointment}>
                  Confirm Appointment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="p-5 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Filter by Doctor</h3>
            </div>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedDoctor("")}>
                All Doctors
              </Button>
              {mockDoctors.map((doctor) => (
                <Button
                  key={doctor.id}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-semibold text-foreground">Today's Appointments</h3>
            {mockAppointments.map((apt) => (
              <Card key={apt.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{apt.patientName}</h4>
                      <p className="text-sm text-muted-foreground">{apt.doctorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-foreground">10:00 AM</p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
