// components/ProtectedRoute.jsx
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(BACKEND_URL + "/api/auth/verify", { withCredentials: true })
        setIsAuthenticated(true)  // 
      } catch {
        setIsAuthenticated(false) // 
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;