import type { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { TicketProvider } from "./TicketContext";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <TicketProvider>{children}</TicketProvider>
    </AuthProvider>
  );
}
