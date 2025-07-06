import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated
    ? <Element {...rest} />
    : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
