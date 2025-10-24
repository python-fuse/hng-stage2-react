import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Ticket, TicketContextType } from "../types";

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Load tickets from localStorage on app start
    const savedTickets = localStorage.getItem("ticketapp_tickets");
    if (savedTickets) {
      try {
        const parsedTickets = JSON.parse(savedTickets);
        setTickets(parsedTickets);
      } catch (error) {
        console.error("Error parsing saved tickets:", error);
        localStorage.removeItem("ticketapp_tickets");
      }
    }
  }, []);

  // Save tickets to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = (
    ticketData: Omit<Ticket, "id" | "createdAt" | "updatedAt">
  ) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket_${Date.now()}_${Math.random()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTickets((prev) => [...prev, newTicket]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const getTicketStats = () => {
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const inProgress = tickets.filter(
      (ticket) => ticket.status === "in_progress"
    ).length;
    const closed = tickets.filter(
      (ticket) => ticket.status === "closed"
    ).length;

    return { total, open, inProgress, closed };
  };

  const value: TicketContextType = {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketStats,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};
