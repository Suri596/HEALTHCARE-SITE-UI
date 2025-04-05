import React, { useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => { 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    qualification: "",
    mobile: "",
    email: "",
    password: "",
  });
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
      const response = await axios.post("http://localhost/react_auth/signup.php", user, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage(response.data.message);
      if (response.data.status === "success") {
        navigate("/signin");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <div className="sign-up-container">
      <div className="container">
        <div className="logo">
          <img src="/images/logo.png" height="130px" width="170px" alt="Logo" />
        </div>

        <header>Sign Up</header>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input type="text" name="firstName" onChange={handleChange} required />
            <label>First Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="lastName" onChange={handleChange} required />
            <label>Last Name</label>
          </div>
          <div className="input-field">
            <input type="date" name="dob" onChange={handleChange} required style={{ color: "grey" }} />
          </div>
          <div className="input-field-radio">
            <label className="gender">Gender :</label>
            <input type="radio" id="male" name="gender" value="Male" onChange={handleChange} required />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" onChange={handleChange} required />
            <label htmlFor="female">Female</label>
            <input type="radio" id="others" name="gender" value="Others" onChange={handleChange} required />
            <label htmlFor="others">Others</label>
          </div>
          <div className="input-field">
            <input type="text" name="qualification" onChange={handleChange} required />
            <label>Qualification</label>
          </div>
          <div className="input-field">
            <input type="tel" name="mobile" onChange={handleChange} required />
            <label>Mobile No.</label>
          </div>
          <div className="input-field">
            <input id="email" type="email" name="email" onChange={handleChange} required />
            <label>Email</label>
          </div>
          <div className="input-field">
            <input id="password" type={passwordVisible ? "text" : "password"} name="password" onChange={handleChange} required />
            <span className="show" onClick={togglePassword}>
              {passwordVisible ? "HIDE" : "SHOW"}
            </span>
            <label>Create Password</label>
          </div>
          <div className="button">
            <button className="btn" type="submit">SIGN UP</button>
          </div>
        </form>
        {message && <p>{message}</p>}
        <div className="auth">Or sign up with</div>
        <div className="links">
          <div className="facebook">
            <i className="fab fa-facebook-square"><span>Facebook</span></i>
          </div>
          <div className="google">
            <i className="fab fa-google-plus-square"><span>Google</span></i>
          </div>
        </div>
        <div className="signup">
          Already have an account? <button className="signupbutton" onClick={() => navigate("/signin")}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
