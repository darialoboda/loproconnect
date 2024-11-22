// src/pages/RegistrationPage.js
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "../styles/LoginPage.css"; // Import styles for registration page

export default function RegistrationPage() {
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const openRegistrationModal = () => {
        setShowRegistrationModal(true);
    };

    const closeRegistrationModal = () => {
        setShowRegistrationModal(false);
    };

    return (
        <div>
            <div className="registration-container">
                <div className="registration-box">
                    <h2>Prihlásiť sa</h2>
                    <form>
                        <div className="input-group">
                            <div className="icon"><FaUserAlt /></div>
                            <input type="email" placeholder="Tvoj email " required className="input" />
                        </div>
                        <div className="input-group">
                            <div className="icon"><FaLock /></div>
                            <input type="password" placeholder="Tvoje heslo " required className="input" />
                        </div>
                        {/* <div className="terms">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the Terms of Service.</label>
                        </div> */}
                        <button type="submit">Prihlásiť sa</button>
                    </form>
                    <p className="register-prompt">
                    Nemáš účet?  <span onClick={openRegistrationModal} className="register-link">Vytvor si ho!</span>
                    </p>
                </div>
            </div>

            {/* Registration Modal */}
            {showRegistrationModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Vytvorit si konto</h2>
                        <form>
                            <div className="input-group">
                                <div className="icon"><FaUserAlt /></div>
                                <input type="text" placeholder="Tvoje meno : " required className="input" />
                            </div>
                            <div className="input-group">
                                <div className="icon"><FaUserAlt /></div>
                                <input type="email" placeholder="Email" required className="input" />
                            </div>
                            <div className="input-group">
                                <div className="icon"><FaLock /></div>
                                <input type="password" placeholder="Heslo" required className="input" />
                            </div>
                            <button type="submit">Zaregistrovať sa </button>
                        </form>
                        <button onClick={closeRegistrationModal} className="close-modal">Zatvoriť </button>
                    </div>
                </div>
            )}
        </div>
    );
}
