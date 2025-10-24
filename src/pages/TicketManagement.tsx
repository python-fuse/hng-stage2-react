import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import CreateTicketForm from "../components/forms/CreateTicketForm";
import EditTicketForm from "../components/forms/EditTicketForm";
import { useTickets } from "../context/TicketContext";
import { getStatusColor, formatStatus } from "../utils/statusColors";
import type { Ticket } from "../types";

export default function TicketManagement() {
  const { tickets, deleteTicket } = useTickets();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "open" | "in_progress" | "closed"
  >("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  // Filter tickets based on search and status
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteTicket = async (ticketId: string, ticketTitle: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${ticketTitle}"? This action cannot be undone.`
      )
    ) {
      deleteTicket(ticketId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    const colors = getStatusColor(status);
    return (
      <Badge className={`${colors.bg} ${colors.text} hover:${colors.bg}`}>
        {formatStatus(status)}
      </Badge>
    );
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppLayout>
        <div className="py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Ticket Management</h1>
            <Button onClick={() => setShowCreateForm(true)} size="lg">
              + Create New Ticket
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tickets by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === "open" ? "default" : "outline"}
                onClick={() => setStatusFilter("open")}
                size="sm"
              >
                Open
              </Button>
              <Button
                variant={statusFilter === "in_progress" ? "default" : "outline"}
                onClick={() => setStatusFilter("in_progress")}
                size="sm"
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === "closed" ? "default" : "outline"}
                onClick={() => setStatusFilter("closed")}
                size="sm"
              >
                Closed
              </Button>
            </div>
          </div>

          {/* Tickets List */}
          {filteredTickets.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">
                  {tickets.length === 0
                    ? "No tickets yet. Create your first ticket!"
                    : "No tickets match your current filters."}
                </p>
                {tickets.length === 0 && (
                  <Button onClick={() => setShowCreateForm(true)}>
                    Create Your First Ticket
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">
                        {ticket.title}
                      </CardTitle>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {ticket.priority && (
                        <span
                          className={`font-medium ${getPriorityColor(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority.charAt(0).toUpperCase() +
                            ticket.priority.slice(1)}{" "}
                          Priority
                        </span>
                      )}
                      <span>Created: {formatDate(ticket.createdAt)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ticket.description && (
                      <p className="text-gray-700 line-clamp-3">
                        {ticket.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-500">
                        Updated: {formatDate(ticket.updatedAt)}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingTicket(ticket)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDeleteTicket(ticket.id, ticket.title)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Stats Footer */}
          {tickets.length > 0 && (
            <div className="mt-8 text-center text-gray-600">
              <p>
                Showing {filteredTickets.length} of {tickets.length} tickets
                {statusFilter !== "all" &&
                  ` (filtered by ${formatStatus(statusFilter)})`}
              </p>
            </div>
          )}
        </div>
      </AppLayout>

      {/* Create Ticket Modal */}
      {showCreateForm && (
        <CreateTicketForm onClose={() => setShowCreateForm(false)} />
      )}

      {/* Edit Ticket Modal */}
      {editingTicket && (
        <EditTicketForm
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
        />
      )}
    </div>
  );
}
