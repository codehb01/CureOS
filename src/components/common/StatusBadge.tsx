import { cn } from "@/lib/utils";

type StatusType = 
  | 'waiting' | 'in-consult' | 'checked-in' | 'scheduled' | 'completed' | 'cancelled'
  | 'pending' | 'dispensed' | 'sample-collected'
  | 'free' | 'occupied' | 'discharge-requested'
  | 'paid' | 'partial' | 'in-progress';

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  waiting: { label: 'Waiting', className: 'bg-warning/10 text-warning' },
  'in-consult': { label: 'In Consult', className: 'bg-accent/10 text-accent' },
  'checked-in': { label: 'Checked In', className: 'bg-success/10 text-success' },
  scheduled: { label: 'Scheduled', className: 'bg-muted text-muted-foreground' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-destructive/10 text-destructive' },
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
  dispensed: { label: 'Dispensed', className: 'bg-success/10 text-success' },
  'sample-collected': { label: 'Sample Collected', className: 'bg-accent/10 text-accent' },
  free: { label: 'Free', className: 'bg-success/10 text-success' },
  occupied: { label: 'Occupied', className: 'bg-destructive/10 text-destructive' },
  'discharge-requested': { label: 'Discharge', className: 'bg-warning/10 text-warning' },
  paid: { label: 'Paid', className: 'bg-success/10 text-success' },
  partial: { label: 'Partial', className: 'bg-warning/10 text-warning' },
  'in-progress': { label: 'In Progress', className: 'bg-accent/10 text-accent' },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn("status-badge", config.className, className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
