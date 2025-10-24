import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("ticketapp_session");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
