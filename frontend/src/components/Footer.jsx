import React from "react";
import "../index.css"; // Optional styling
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="credits">
            Created by <span className="name">Aya Bedair</span>
          </p>
          <p className="copyright">
            © {currentYear} Game Store. All rights reserved.
          </p>
        </div>

        <div className="footer-links">
          <p
            onClick={() => navigate("/privacy-policy")}
            className="footer-link"
          >
            Privacy Policy
          </p>
          <p
            onClick={() => navigate("/terms-of-services")}
            className="footer-link"
          >
            Terms of Service
          </p>
          <p onClick={() => navigate("/contact-us")} className="footer-link">
            Contact Us
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
