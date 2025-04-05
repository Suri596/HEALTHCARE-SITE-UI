import React, { useEffect, useState } from "react";
import "./About.css";

const AboutUs = () => {
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });

  useEffect(() => {
    fetch("http://localhost/backend/getContact.php")
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error("Error fetching contact info:", error));
  }, []);

  return (
    <div>
      {/* About Us Header Section */}
      <div className="about-us-header">
        <div className="overlay">
          <h1>About Us</h1>
        </div>
      </div>

      {/* Vision Section */}
      <section className="visions-container">
        <div className="visions-image">
          <img src="/images/About2.1.jpeg" alt="Scientist working" />
          <img src="/images/About2.2.jpeg" alt="Herbs in a bowl" className="small-img" />
        </div>

        <div className="visions-text">
          <h2>Visions</h2>
          <p>
            At Care Companion, we are dedicated to revolutionizing the healthcare industry 
            by providing cutting-edge technology for symptom diagnosis and data management.
          </p>
        </div>
      </section>

      {/* Professional Team Section */}
      <section className="team-container">
        <div className="team-text">
          <h2>Professional Team</h2>
          <p>
            Our team is committed to delivering an intuitive and reliable chatbot 
            solution that streamlines the diagnostic process and enhances patient care.
          </p>
          <a href="#features" className="features-button">OUR FEATURES</a>
        </div>

        <div className="team-images">
          <img src="/images/About3.png" alt="Team member 1" />
          <img src="/images/About4.jpg" alt="Team member 2" />
          <img src="/images/About5.jpg" alt="Team member 3" />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          {/* Company Overview */}
          <div className="footer-section">
            <h3>Company Overview</h3>
            <p>
              With a commitment to excellence and customer satisfaction, we strive
              to deliver premium quality and innovative solutions tailored to meet
              your needs.
            </p>
          </div>

          {/* Contact Section (Now Fetching from Backend) */}
          <div className="footer-section">
            <h3>Contact</h3>
            <p>📞 {contactInfo.phone || "999 673 984"}</p>
            <p>📧 {contactInfo.email || "example@yoursdomain.com"}</p>
          </div>

          {/* Services Section */}
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

export default AboutUs;
