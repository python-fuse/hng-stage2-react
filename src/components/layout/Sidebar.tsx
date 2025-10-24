import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useAuth } from "../../context/AuthContext";
import { useTickets } from "../../context/TicketContext";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTicketStats } = useTickets();
  const stats = getTicketStats();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600">Ticketly</h2>
        {user && (
          <p className="text-sm text-gray-600 mt-1">Welcome, {user.name}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          onClick={closeMobileMenu}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/dashboard")
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span>Dashboard</span>
        </Link>

        <Link
          to="/tickets"
          onClick={closeMobileMenu}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/tickets")
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span>Tickets</span>
        </Link>
      </nav>

      {/* Stats Section */}
      <div className="p-4 border-t bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-sm font-medium text-blue-600">
              {stats.total}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Open</span>
            <span className="text-sm font-medium text-green-600">
              {stats.open}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">In Progress</span>
            <span className="text-sm font-medium text-amber-600">
              {stats.inProgress}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Closed</span>
            <span className="text-sm font-medium text-gray-600">
              {stats.closed}
            </span>
          </div>
        </div>
      </div>

      {/* User Actions */}
      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <span className="mr-2">👋</span>
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:shrink-0">
        <div className="w-64 bg-white border-r">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">Ticketly</h1>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-[1440px] mx-auto">{children}</div>
          </div>
        </div>

        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}
