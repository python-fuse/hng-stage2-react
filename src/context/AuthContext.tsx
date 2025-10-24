import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("ticketapp_session");
    const savedUser = localStorage.getItem("ticketapp_user");

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("ticketapp_session");
        localStorage.removeItem("ticketapp_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0], // Use email prefix as name
      };

      const mockToken = `token_${Date.now()}_${Math.random()}`;

      localStorage.setItem("ticketapp_session", mockToken);
      localStorage.setItem("ticketapp_user", JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    // Mock signup - in real app, this would be an API call
    if (email && password && name) {
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
      };

      const mockToken = `token_${Date.now()}_${Math.random()}`;

      localStorage.setItem("ticketapp_session", mockToken);
      localStorage.setItem("ticketapp_user", JSON.stringify(mockUser));

      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("ticketapp_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
