import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  
  const navigate = useNavigate(); // ✅ Placed inside a function
  

  const handleLogout = () => {
    navigate("/logout"); // Redirect to logout page
  };
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/images/logo.png" alt="Care Companion Logo" />
        <h1>Care Companion</h1>
      </div>
      <nav className="navbar-menu">
        <ul>
          <Link to="/home">HOME</Link>
          <Link to="/chatbot">CHATBOT</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT US</Link>
          <button onClick={handleLogout} className="logout-button">LOGOUT</button>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
