import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FileText, Plus, Pill, TestTube, BedDouble, History, AlertCircle } from "lucide-react";

const diagnoses = ["Viral Fever", "Common Cold", "Hypertension", "Type 2 Diabetes", "Migraine", "Gastritis"];
const medicines = ["Paracetamol 500mg", "Amoxicillin 250mg", "Omeprazole 20mg", "Metformin 500mg", "Amlodipine 5mg"];
const labTests = ["Complete Blood Count (CBC)", "Blood Sugar (Fasting)", "Lipid Profile", "Chest X-Ray", "ECG", "Urine Analysis"];

export default function EMR() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<{ medicine: string; dosage: string }[]>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { medicine: "", dosage: "" }]);
  };

  const handleSave = () => {
    toast({
      title: "Consultation Saved",
      description: "Patient records have been updated successfully.",
    });
  };

  const handleAdmit = () => {
    toast({
      title: "Admission Request Sent",
      description: "IPD admission request has been submitted to nursing.",
    });
  };

  return (
    <DashboardLayout role="doctor" title="Electronic Medical Record" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              J
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">John Smith</h1>
              <p className="text-muted-foreground">UHID-2024-001 • Male, 45 years</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            View History
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Consultation Notes</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Chief Complaint</Label>
                  <Textarea placeholder="Enter patient's chief complaint..." className="mt-1" />
                </div>

                <div>
                  <Label>Diagnosis</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select diagnosis" />
                    </SelectTrigger>
                    <SelectContent>
                      {diagnoses.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Clinical Notes</Label>
                  <Textarea placeholder="Additional clinical observations..." className="mt-1" rows={4} />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Prescription</h3>
                </div>
                <Button variant="outline" size="sm" onClick={addPrescription}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Medicine
                </Button>
              </div>

              <div className="space-y-3">
                {prescriptions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No medicines added yet</p>
                ) : (
                  prescriptions.map((_, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medicine" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicines.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input placeholder="Dosage (e.g., 1-0-1 for 7 days)" />
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <TestTube className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Lab Orders</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {labTests.map((test) => (
                  <label key={test} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors">
                    <Checkbox
                      checked={selectedTests.includes(test)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTests([...selectedTests, test]);
                        } else {
                          setSelectedTests(selectedTests.filter((t) => t !== test));
                        }
                      }}
                    />
                    <span className="text-sm text-foreground">{test}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-5">
              <h3 className="font-semibold text-foreground mb-3">Patient Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <span className="font-medium text-foreground">O+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allergies</span>
                  <span className="font-medium text-destructive">Penicillin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Visit</span>
                  <span className="font-medium text-foreground">3 months ago</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-warning/30 bg-warning/5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-warning" />
                <h3 className="font-semibold text-foreground">Alerts</h3>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Known allergy to Penicillin</li>
                <li>• History of hypertension</li>
              </ul>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" onClick={handleSave}>
                Save Consultation
              </Button>
              <Button variant="destructive" className="w-full gap-2" onClick={handleAdmit}>
                <BedDouble className="h-4 w-4" />
                Admit Patient
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
