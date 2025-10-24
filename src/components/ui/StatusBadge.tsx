import { Badge } from "./badge";
import { getStatusColor, formatStatus } from "../../utils/statusColors";
import type { TicketStatus } from "../../utils/statusColors";

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const colors = getStatusColor(status);

  return (
    <Badge
      className={`${colors.bg} ${colors.text} hover:${colors.bg} ${className}`}
      variant="secondary"
    >
      {formatStatus(status)}
    </Badge>
  );
}
