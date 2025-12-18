import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Settings, Save, Plus, Trash2 } from "lucide-react";

const services = [
  { id: "1", name: "OPD Consultation", price: 500 },
  { id: "2", name: "Specialist Consultation", price: 800 },
  { id: "3", name: "Cardiac MRI", price: 15000 },
  { id: "4", name: "CT Scan", price: 5000 },
  { id: "5", name: "Bed Charges (per day)", price: 1000 },
];

export default function AdminSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [serviceList, setServiceList] = useState(services);

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setServiceList(serviceList.map((s) => (s.id === id ? { ...s, price: newPrice } : s)));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Service prices have been updated successfully.",
    });
  };

  return (
    <DashboardLayout role="admin" title="Settings" onLogout={() => navigate("/")}>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure services and pricing</p>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Service Pricing</h3>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </div>

          <div className="space-y-3">
            {serviceList.map((service) => (
              <div key={service.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{service.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => handleUpdatePrice(service.id, parseInt(e.target.value))}
                    className="w-28"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button className="w-full mt-6 gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
