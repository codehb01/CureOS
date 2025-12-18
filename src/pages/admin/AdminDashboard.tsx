import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/common/StatCard";
import { analyticsData } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { DollarSign, Users, Bed, Clock, TrendingUp, FileText } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="admin" title="Admin Dashboard" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hospital Overview</h1>
          <p className="text-muted-foreground">Real-time analytics and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Revenue"
            value={`₹${analyticsData.revenue.today.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Patients Today"
            value={analyticsData.patients.today}
            icon={Users}
            subtitle={`${analyticsData.patients.week} this week`}
          />
          <StatCard
            title="Bed Occupancy"
            value={`${analyticsData.bedOccupancy}%`}
            icon={Bed}
          />
          <StatCard
            title="Avg. Wait Time"
            value={`${analyticsData.avgWaitTime} min`}
            icon={Clock}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Revenue Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Today</span>
                <span className="font-semibold text-foreground">₹{analyticsData.revenue.today.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">This Week</span>
                <span className="font-semibold text-foreground">₹{analyticsData.revenue.week.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-semibold text-foreground">₹{analyticsData.revenue.month.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Quick Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Pending Bills</span>
                <span className="font-semibold text-warning">{analyticsData.pendingBills}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">Active Doctors</span>
                <span className="font-semibold text-success">4</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="text-muted-foreground">IPD Patients</span>
                <span className="font-semibold text-foreground">12</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
