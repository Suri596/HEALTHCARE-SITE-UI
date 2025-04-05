import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Import CSS file for styling

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear authentication token from localStorage
    localStorage.removeItem("userToken");

    // ✅ Redirect to the SignIn page immediately
    navigate("/", { replace: true });

  }, [navigate]);

  return (
    <div className="logout-container">
      <h1>Logging Out...</h1>
    </div>
  );
};

export default Logout;
