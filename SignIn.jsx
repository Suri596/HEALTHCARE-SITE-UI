import React, { useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => { 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/react_auth/login.php", user, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage(response.data.message);
      if (response.data.status === "success") {
        navigate("/home");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <div className="sign-in-container">
      <div className="outter">
      <div className="container">
        <div className="logo1">
          <img src="/images/logo.png" height="130px" width="170px" alt="Logo" />
        </div>
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-field">
            <input type="text" name="email" placeholder=" " onChange={handleChange} required />
            <label>Email or Username</label>
          </div>

          {/* Password Input */}
          <div className="input-field">
            <input 
              type={passwordVisible ? "text" : "password"} 
              name="password"
              placeholder=" " 
              onChange={handleChange}
              required
            />
            <span 
              className="show" 
              onClick={togglePassword} 
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? "HIDE" : "SHOW"}
            </span>
            <label>Password</label>
          </div>

          {/* Submit Button */}
          <div className="button">
            <button id="submitSignIn" className="btn" type="submit">
              LOGIN
            </button>
          </div>
        </form>

        {/* Error Message */}
        {message && <p className="error-message">{message}</p>}

        {/* Social Media Login */}
        <div className="auth">Or login with</div>
        <div className="links">
          <div className="facebook">
            <i className="fab fa-facebook-square"></i> <span>Facebook</span>
          </div>
          <div className="google">
            <i className="fab fa-google-plus-square"></i> <span>Google</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="signup">
          Not a member? <button className="signbutton" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
