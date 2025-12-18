import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockLabTests } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Upload, Save } from "lucide-react";

export default function LabResults() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTest, setSelectedTest] = useState("");
  const [result, setResult] = useState("");

  const inProgressTests = mockLabTests.filter((t) => t.status === "sample-collected");

  const handleSave = () => {
    toast({
      title: "Results Saved",
      description: "Test results have been saved and are now visible to the doctor.",
    });
    setSelectedTest("");
    setResult("");
  };

  return (
    <DashboardLayout role="lab_technician" title="Enter Results" onLogout={() => navigate("/")}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Result Entry</h1>
          <p className="text-muted-foreground">Upload or enter test results</p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label>Select Test</Label>
              <Select value={selectedTest} onValueChange={setSelectedTest}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose test to enter results" />
                </SelectTrigger>
                <SelectContent>
                  {inProgressTests.map((test) => (
                    <SelectItem key={test.id} value={test.id}>
                      {test.patientName} - {test.testName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Result Value / Notes</Label>
              <Textarea
                placeholder="Enter numeric values or notes (e.g., Hemoglobin: 12.5 g/dL)"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground mb-1">Upload Report File</p>
              <p className="text-sm text-muted-foreground mb-4">PDF or Image (Max 10MB)</p>
              <Button variant="outline">Choose File</Button>
            </div>

            <Button className="w-full gap-2" onClick={handleSave} disabled={!selectedTest}>
              <Save className="h-4 w-4" />
              Save Results
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
