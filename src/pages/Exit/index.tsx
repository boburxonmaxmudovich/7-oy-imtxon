import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Exit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");

    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
};

export default Exit;
