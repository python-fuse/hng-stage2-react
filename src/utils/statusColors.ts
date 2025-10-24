export const statusColors = {
  open: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    badge: "bg-green-500",
  },
  in_progress: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    border: "border-amber-200",
    badge: "bg-amber-500",
  },
  closed: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
    badge: "bg-gray-500",
  },
} as const;

export type TicketStatus = keyof typeof statusColors;

export const getStatusColor = (status: TicketStatus) => {
  return statusColors[status];
};

export const formatStatus = (status: TicketStatus): string => {
  return status === "in_progress"
    ? "In Progress"
    : status.charAt(0).toUpperCase() + status.slice(1);
};
