import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { getTicketStats } = useTickets();
  const stats = getTicketStats();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to login page after logout
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Ticketly Dashboard</h1>
              {user && (
                <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
              )}
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-600">
                  Total Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.total}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-600">
                  Open Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {stats.open}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-600">
                  Resolved Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-600">
                  {stats.closed}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full">
                  <Link to="/tickets">Manage Tickets</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/tickets">Create New Ticket</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.inProgress}
                </p>
                <p className="text-gray-600 text-sm">
                  tickets currently being worked on
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </div>
  );
}
