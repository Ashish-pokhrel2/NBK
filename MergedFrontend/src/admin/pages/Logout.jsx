import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");            // ✅ important
    localStorage.removeItem("isAdminLoggedIn");  // ✅ optional (cleanup)
    navigate("/login");
  }, [navigate]);

  return null;
}
