import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockBeds } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Bed, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NurseWardMap() {
  const navigate = useNavigate();

  const wards = [...new Set(mockBeds.map((b) => b.ward))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "free":
        return "bg-success/10 border-success/30 hover:border-success";
      case "occupied":
        return "bg-destructive/10 border-destructive/30 hover:border-destructive";
      case "discharge-requested":
        return "bg-warning/10 border-warning/30 hover:border-warning";
      default:
        return "bg-muted";
    }
  };

  return (
    <DashboardLayout role="nurse" title="Ward Map" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bed View</h1>
            <p className="text-muted-foreground">Monitor and manage ward occupancy</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Discharge</span>
            </div>
          </div>
        </div>

        {wards.map((ward) => (
          <Card key={ward} className="p-5">
            <h3 className="font-semibold text-foreground mb-4">{ward}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockBeds
                .filter((b) => b.ward === ward)
                .map((bed) => (
                  <div
                    key={bed.id}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all",
                      getStatusColor(bed.status)
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span className="font-bold text-foreground">{bed.number}</span>
                    </div>
                    {bed.patientName ? (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground truncate">{bed.patientName}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-success">Available</span>
                    )}
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
