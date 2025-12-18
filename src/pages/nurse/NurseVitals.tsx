import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Activity, AlertTriangle, Save } from "lucide-react";
import { mockBeds } from "@/data/mockData";

export default function NurseVitals() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [vitals, setVitals] = useState({
    temperature: "",
    pulse: "",
    bpSystolic: "",
    bpDiastolic: "",
    spo2: "",
  });

  const occupiedBeds = mockBeds.filter((b) => b.status !== "free");

  const isAbnormal = () => {
    const temp = parseFloat(vitals.temperature);
    const pulse = parseInt(vitals.pulse);
    const spo2 = parseInt(vitals.spo2);
    return temp > 102 || pulse > 100 || pulse < 50 || spo2 < 95;
  };

  const handleSave = () => {
    toast({
      title: isAbnormal() ? "⚠️ Abnormal Vitals Recorded" : "Vitals Recorded",
      description: isAbnormal()
        ? "High alert: Abnormal values detected. Doctor has been notified."
        : "Patient vitals have been saved successfully.",
      variant: isAbnormal() ? "destructive" : "default",
    });
  };

  return (
    <DashboardLayout role="nurse" title="Vitals Logger" onLogout={() => navigate("/")}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Record Vitals</h1>
          <p className="text-muted-foreground">Log patient vital signs</p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label>Select Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose patient" />
                </SelectTrigger>
                <SelectContent>
                  {occupiedBeds.map((bed) => (
                    <SelectItem key={bed.id} value={bed.id}>
                      {bed.patientName} - Bed {bed.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Temperature (°F)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="98.6"
                  value={vitals.temperature}
                  onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Pulse (bpm)</Label>
                <Input
                  type="number"
                  placeholder="72"
                  value={vitals.pulse}
                  onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Blood Pressure (Systolic)</Label>
                <Input
                  type="number"
                  placeholder="120"
                  value={vitals.bpSystolic}
                  onChange={(e) => setVitals({ ...vitals, bpSystolic: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Blood Pressure (Diastolic)</Label>
                <Input
                  type="number"
                  placeholder="80"
                  value={vitals.bpDiastolic}
                  onChange={(e) => setVitals({ ...vitals, bpDiastolic: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label>SpO2 (%)</Label>
                <Input
                  type="number"
                  placeholder="98"
                  value={vitals.spo2}
                  onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            {isAbnormal() && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">High Alert</p>
                  <p className="text-sm text-muted-foreground">Abnormal values detected. Please verify readings.</p>
                </div>
              </div>
            )}

            <Button className="w-full gap-2" onClick={handleSave} disabled={!selectedPatient}>
              <Save className="h-4 w-4" />
              Save Vitals
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
