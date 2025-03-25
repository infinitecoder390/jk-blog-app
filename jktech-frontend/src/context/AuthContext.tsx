import { getEnv } from "@/lib/utils";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  username: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (provider: string) => void;
  logout: () => void;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null); // The user can either be null or a User object
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("blog-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);

    // Check for user data in query parameters on initial load
    const queryParams = new URLSearchParams(window.location.search);
    const userData = queryParams.get("user");
    const tokenData = queryParams.get("token");

    if (userData && tokenData) {
      const parsedUser = JSON.parse(decodeURIComponent(userData));
      setUser(parsedUser); // Update state with user data
      localStorage.setItem("blog-user", JSON.stringify(parsedUser)); // Store in localStorage
      localStorage.setItem("token", tokenData);
      window.history.replaceState({}, document.title, window.location.pathname); // Clean up URL
    }
  }, []);

  const login = (provider: string) => {
    // Redirect to backend for authentication
    window.location.href = `${getEnv("VITE_API_URL")}/auth/${provider}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("blog-user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
