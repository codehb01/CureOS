import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockBills } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Receipt, Printer, CreditCard } from "lucide-react";

export default function BillingDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerateInvoice = (patientName: string) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice for ${patientName} has been generated and sent to printer.`,
    });
  };

  return (
    <DashboardLayout role="accountant" title="Final Billing" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Master Ledger</h1>
            <p className="text-muted-foreground">All billable services consolidated</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/billing/insurance")} className="gap-2">
            <CreditCard className="h-4 w-4" />
            Insurance Processing
          </Button>
        </div>

        <div className="space-y-4">
          {mockBills.map((bill) => (
            <Card key={bill.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                    {bill.patientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{bill.patientName}</h3>
                    <p className="text-sm text-muted-foreground">{bill.uhid}</p>
                  </div>
                </div>
                <StatusBadge status={bill.status} />
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                {["consultation", "lab", "pharmacy", "bed"].map((cat) => {
                  const amount = bill.items
                    .filter((i) => i.category === cat)
                    .reduce((sum, i) => sum + i.amount, 0);
                  return (
                    <div key={cat} className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground capitalize">{cat}</p>
                      <p className="font-semibold text-foreground">₹{amount}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-foreground">₹{bill.total}</p>
                  {bill.insuranceAmount && (
                    <p className="text-xs text-success">Insurance: ₹{bill.insuranceAmount} | Co-pay: ₹{bill.total - bill.insuranceAmount}</p>
                  )}
                </div>
                <Button className="gap-2" onClick={() => handleGenerateInvoice(bill.patientName)}>
                  <Printer className="h-4 w-4" />
                  Generate Invoice
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
