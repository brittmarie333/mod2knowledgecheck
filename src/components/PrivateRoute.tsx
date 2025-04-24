// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  

interface PrivateRouteProps {
  children: React.ReactNode; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth(); 

  // if not logged in - redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if the user is logged in, render the children 
  return <>{children}</>;
};

export default PrivateRoute;
