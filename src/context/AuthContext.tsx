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
    // Get registered users from localStorage
    const savedUsers = localStorage.getItem("ticketapp_users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    // Check if user exists with correct password
    const user = users.find(
      (u: User & { password: string }) =>
        u.email === email && u.password === password
    );

    if (user) {
      const mockToken = `token_${Date.now()}_${Math.random()}`;

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;

      localStorage.setItem("ticketapp_session", mockToken);
      localStorage.setItem(
        "ticketapp_user",
        JSON.stringify(userWithoutPassword)
      );

      setUser(userWithoutPassword);
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
    // Get existing users
    const savedUsers = localStorage.getItem("ticketapp_users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    // Check if user already exists
    const existingUser = users.find(
      (u: User & { password: string }) => u.email === email
    );
    if (existingUser) {
      return false; // User already exists
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      password, // Store password for mock authentication
    };

    // Add to users array and save
    users.push(newUser);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));

    // Auto-login the new user
    const mockToken = `token_${Date.now()}_${Math.random()}`;
    const { password: _, ...userWithoutPassword } = newUser;

    localStorage.setItem("ticketapp_session", mockToken);
    localStorage.setItem("ticketapp_user", JSON.stringify(userWithoutPassword));

    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    return true;
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
