import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'client';

type AuthContextType = {
    user: { role: UserRole } | null;
    login: (role: UserRole) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ role: UserRole } | null>(null);

    const login = (role: UserRole) => {
        setUser({ role });
        localStorage.setItem('userRole', role);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);