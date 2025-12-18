import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockBills } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CreditCard, Calculator } from "lucide-react";

export default function InsuranceProcessing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBill, setSelectedBill] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [approvedAmount, setApprovedAmount] = useState("");

  const bill = mockBills.find((b) => b.id === selectedBill);
  const copay = bill && approvedAmount ? bill.total - parseFloat(approvedAmount) : 0;

  const handleSplit = () => {
    toast({
      title: "Bill Split Successfully",
      description: `Insurance: ₹${approvedAmount} | Patient Co-pay: ₹${copay}`,
    });
  };

  return (
    <DashboardLayout role="accountant" title="Insurance Processing" onLogout={() => navigate("/")}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Insurance Processor</h1>
          <p className="text-muted-foreground">Split bills between insurance and co-pay</p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label>Select Patient Bill</Label>
              <Select value={selectedBill} onValueChange={setSelectedBill}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose bill" />
                </SelectTrigger>
                <SelectContent>
                  {mockBills.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.patientName} - ₹{b.total}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {bill && (
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">Total Bill Amount</p>
                <p className="text-2xl font-bold text-foreground">₹{bill.total}</p>
              </div>
            )}

            <div>
              <Label>Insurance Provider</Label>
              <Input
                placeholder="e.g., Max Bupa, ICICI Lombard"
                value={insuranceProvider}
                onChange={(e) => setInsuranceProvider(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Policy Number</Label>
              <Input
                placeholder="Enter policy number"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Approved Insurance Amount</Label>
              <Input
                type="number"
                placeholder="Enter approved amount"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            {bill && approvedAmount && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-sm text-muted-foreground">Insurance Covers</p>
                  <p className="text-xl font-bold text-success">₹{approvedAmount}</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm text-muted-foreground">Patient Co-pay</p>
                  <p className="text-xl font-bold text-warning">₹{copay}</p>
                </div>
              </div>
            )}

            <Button className="w-full gap-2" onClick={handleSplit} disabled={!selectedBill || !approvedAmount}>
              <Calculator className="h-4 w-4" />
              Split Bill
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
