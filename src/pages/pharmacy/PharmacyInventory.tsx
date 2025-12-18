import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { inventoryItems } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PharmacyInventory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="pharmacist" title="Inventory" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inventory Check</h1>
            <p className="text-muted-foreground">Monitor stock levels</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "p-5",
                item.stock < 10 && "border-destructive/30 bg-destructive/5"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    item.stock < 10 ? "bg-destructive/10" : "bg-primary/10"
                  )}>
                    <Package className={cn("h-5 w-5", item.stock < 10 ? "text-destructive" : "text-primary")} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.unit}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">{item.stock}</span>
                {item.stock < 10 && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">Low Stock</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
