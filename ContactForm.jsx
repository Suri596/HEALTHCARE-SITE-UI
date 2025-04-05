import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactForm.css";
import { FaUser, FaEnvelope, FaPen } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage("");
      }, 3000); // Hide message after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [responseMessage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setResponseMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://localhost/backend/contact.php",
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );

      setResponseMessage(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form on success
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="contact-section">
        <div className="overlay">
          <h1>Contact Us</h1>
        </div>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send Us A Message</h2>
            <p>
              Get in touch with us to learn more about our healthcare chatbot solution
              and how it can enhance your medical practice.
            </p>

            <div className="input-group">
              <span className="i name">
                <FaUser />
              </span>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <span className="i email">
                <FaEnvelope />
              </span>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <span className="i msg">
                <FaPen />
              </span>
              <textarea name="message" placeholder="Message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
            </div>

            <button className="submit" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>

            {responseMessage && <p className="response-message">{responseMessage}</p>}
          </form>
        </div>
      </div>

      <footer className="footer1">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Company Overview</h3>
            <p>
              With a commitment to excellence and customer satisfaction, we strive to deliver premium
              quality and innovative solutions tailored to meet your needs.
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>📞 999 673 984</p>
            <p>📧 example@yoursdomain.com</p>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li>Data Storage</li>
              <li>Real-time Monitoring</li>
              <li>Customized Reporting</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
