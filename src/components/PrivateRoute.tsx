// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Assuming useAuth is your custom hook for auth

interface PrivateRouteProps {
  children: React.ReactNode; // Allow any React elements to be passed as children
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Check if user is logged in from context

  // If no user (not logged in), redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children (the wrapped component, like Dashboard)
  return <>{children}</>;
};

export default PrivateRoute;
