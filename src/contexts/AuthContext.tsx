import { createContext, useContext, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type UserRole = "admin" | "client";

type AuthContextType = {
  user: { role: UserRole } | null;
  login: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  console.log(token, location.pathname);
  const [user, setUser] = useState<{ role: UserRole } | null>(null);

  const login = (role: UserRole) => {
    setUser({ role });
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userRole");
  };
  if (["/auth", "/reg"].includes(location.pathname) && token)
    return <Navigate to="/" />;
  if (!["/auth", "/reg"].includes(location.pathname) && !token)
    return <Navigate to="/auth" />;
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
