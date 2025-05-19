import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Props = {
    allowedRoles: ('admin' | 'client')[];
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
    const { user } = useAuth();
    const location = useLocation();

    return user && allowedRoles.includes(user.role) ? (
        <Outlet />
    ) : user ? (
        <Navigate to="/registration" replace />
    ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
    );
};