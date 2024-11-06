// src/pages/RegistrationPage.js
import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Header from "../components/Header";  // Import the Header component
import "../styles/RegistrationPage.css"; // Import styles for registration page

function RegistrationPage() {
    return (
        <div>
        {/* Header will appear on top of the page */}
        <Header />
      <div className="registration-container">
        <div className="registration-box">
          <h2>Sign Up Now</h2>
          <form>
            <div style={{ position: "relative" }}>
              <input type="email" placeholder="Your email" required />
              <div className="icon-wrapper">
                <div className="icon"><FaUserAlt /></div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <input type="password" placeholder="Your password" required />
              <div className="icon-wrapper">
                <div className="icon"><FaLock /></div>
              </div>
            </div>
            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the Terms of Service.</label>
            </div>
            <button type="submit">Create an Account</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
  
  export default RegistrationPage;
