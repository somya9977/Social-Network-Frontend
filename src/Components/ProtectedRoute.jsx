import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../Utils/User";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const dispatch = useDispatch()

  
  const user = useSelector((state) => state.user)
  

  useEffect(() => {
  
    if (user?.user?.username) {
      setIsAuthenticated(true);
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get(BACKEND_URL + "/api/auth/verify",{ withCredentials: true })
        .then((res) => {
         
          dispatch(userReducer(res.data.user))
        })

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;