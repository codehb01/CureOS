import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockLabTests } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { TestTube, Beaker, FileCheck } from "lucide-react";

export default function LabTestQueue() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tests, setTests] = useState(mockLabTests);

  const handleCollect = (id: string) => {
    setTests(tests.map((t) => (t.id === id ? { ...t, status: "sample-collected" as const } : t)));
    toast({
      title: "Sample Collected",
      description: "Sample has been collected and marked for processing.",
    });
  };

  const pending = tests.filter((t) => t.status === "pending");
  const collected = tests.filter((t) => t.status === "sample-collected");
  const completed = tests.filter((t) => t.status === "completed");

  return (
    <DashboardLayout role="lab_technician" title="Test Queue" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Test Request Queue</h1>
            <p className="text-muted-foreground">Lab orders from doctors</p>
          </div>
          <Button onClick={() => navigate("/lab/results")} className="gap-2">
            <FileCheck className="h-4 w-4" />
            Enter Results
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TestTube className="h-5 w-5 text-warning" />
              <h3 className="font-semibold text-foreground">Pending ({pending.length})</h3>
            </div>
            <div className="space-y-3">
              {pending.map((test) => (
                <div key={test.id} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{test.patientName}</span>
                    <StatusBadge status={test.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{test.testName}</p>
                  <Button size="sm" className="w-full" onClick={() => handleCollect(test.id)}>
                    Collect Sample
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Beaker className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">In Progress ({collected.length})</h3>
            </div>
            <div className="space-y-3">
              {collected.map((test) => (
                <div key={test.id} className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{test.patientName}</span>
                    <StatusBadge status={test.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{test.testName}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Completed ({completed.length})</h3>
            </div>
            <div className="space-y-3">
              {completed.map((test) => (
                <div key={test.id} className="p-3 rounded-lg bg-success/5 border border-success/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{test.patientName}</span>
                    <StatusBadge status={test.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{test.testName}</p>
                  {test.result && (
                    <p className="text-xs text-success mt-2">Result: {test.result}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
