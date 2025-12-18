import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockNursingTasks } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CheckCircle, Clock, ClipboardList } from "lucide-react";
import { format } from "date-fns";

export default function NurseTasks() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockNursingTasks);

  const handleComplete = (id: string, task: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "completed" as const } : t)));
    toast({
      title: "Task Completed",
      description: `"${task}" has been marked as complete.`,
    });
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <DashboardLayout role="nurse" title="Nursing Tasks" onLogout={() => navigate("/")}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task List</h1>
          <p className="text-muted-foreground">Tasks auto-generated from doctor's orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="h-5 w-5 text-warning" />
              <h3 className="font-semibold text-foreground">Pending Tasks</h3>
              <span className="ml-auto text-sm text-muted-foreground">{pendingTasks.length} tasks</span>
            </div>

            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{task.task}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.patientName} • Bed {task.bedNumber}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-warning">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs">Due: {format(task.dueAt, "h:mm a")}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleComplete(task.id, task.task)}>
                      Complete
                    </Button>
                  </div>
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                  <p className="text-muted-foreground">All tasks completed!</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-success" />
              <h3 className="font-semibold text-foreground">Completed Today</h3>
              <span className="ml-auto text-sm text-muted-foreground">{completedTasks.length} tasks</span>
            </div>

            <div className="space-y-3">
              {completedTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg bg-success/5 border border-success/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{task.task}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.patientName} • Bed {task.bedNumber}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {completedTasks.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No completed tasks yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
