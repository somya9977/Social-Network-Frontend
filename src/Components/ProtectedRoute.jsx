import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Redux se user lo
  const user = useSelector((state) => state.user);

  useEffect(() => {
  
    if (user?.username) {
      setIsAuthenticated(true);
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get(
          BACKEND_URL + "/api/auth/verify",
          { withCredentials: true }
        );

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [user]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;