// src/pages/RegistrationPage.js
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Header from "../components/Header";  // Import the Header component
import "../styles/LoginPage.css"; // Import styles for registration page

function LoginPage() {
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const openRegistrationModal = () => {
        setShowRegistrationModal(true);
    };

    const closeRegistrationModal = () => {
        setShowRegistrationModal(false);
    };

    return (
        <div>
            {/* Header will appear on top of the page */}
            <Header />
            <div className="registration-container">
                <div className="registration-box">
                    <h2>Sign In Now</h2>
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
                        <button type="submit">Login</button>
                    </form>
                    <p className="register-prompt">
                        Don’t have an account? <span onClick={openRegistrationModal} className="register-link">Create one</span>
                    </p>
                </div>
            </div>

            {/* Registration Modal */}
            {showRegistrationModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Create an Account</h2>
                        <form>
                            <div style={{ position: "relative" }}>
                                <input type="text" placeholder="Your name" required />
                                <div className="icon-wrapper">
                                    <div className="icon"><FaUserAlt /></div>
                                </div>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input type="email" placeholder="Your email" required />
                                <div className="icon-wrapper">
                                    <div className="icon"><FaUserAlt /></div>
                                </div>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input type="password" placeholder="Create password" required />
                                <div className="icon-wrapper">
                                    <div className="icon"><FaLock /></div>
                                </div>
                            </div>
                            <button type="submit">Register</button>
                        </form>
                        <button onClick={closeRegistrationModal} className="close-modal">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
