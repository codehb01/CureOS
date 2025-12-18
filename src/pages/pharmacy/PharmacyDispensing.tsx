import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPrescriptions } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Pill, Package, CheckCircle } from "lucide-react";

export default function PharmacyDispensing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const handleFulfill = (id: string, patientName: string) => {
    setPrescriptions(prescriptions.map((p) => (p.id === id ? { ...p, status: "dispensed" as const } : p)));
    toast({
      title: "Order Fulfilled",
      description: `Medicines for ${patientName} have been dispensed and added to billing.`,
    });
  };

  const pending = prescriptions.filter((p) => p.status === "pending");
  const dispensed = prescriptions.filter((p) => p.status === "dispensed");

  return (
    <DashboardLayout role="pharmacist" title="Dispensing Queue" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dispensing Queue</h1>
            <p className="text-muted-foreground">Prescriptions from doctors</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/pharmacy/inventory")} className="gap-2">
            <Package className="h-4 w-4" />
            Check Inventory
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Pill className="h-5 w-5 text-warning" />
              Pending ({pending.length})
            </h3>
            {pending.map((rx) => (
              <Card key={rx.id} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{rx.patientName}</h4>
                    <p className="text-sm text-muted-foreground">{rx.uhid}</p>
                  </div>
                  <StatusBadge status={rx.status} />
                </div>
                <div className="space-y-2 mb-4">
                  {rx.medicines.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-secondary/50">
                      <span className="text-sm text-foreground">{med.name}</span>
                      <span className="text-sm text-muted-foreground">{med.dosage} × {med.quantity}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full" onClick={() => handleFulfill(rx.id, rx.patientName)}>
                  Fulfill Order
                </Button>
              </Card>
            ))}
            {pending.length === 0 && (
              <Card className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                <p className="text-muted-foreground">No pending prescriptions</p>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Dispensed Today ({dispensed.length})
            </h3>
            {dispensed.map((rx) => (
              <Card key={rx.id} className="p-5 bg-success/5 border-success/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">{rx.patientName}</h4>
                    <p className="text-sm text-muted-foreground">{rx.medicines.length} medicines dispensed</p>
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
