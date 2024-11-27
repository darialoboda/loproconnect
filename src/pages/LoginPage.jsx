import React, { useState } from "react";
import { FaUserAlt, FaLock, FaUserGraduate } from "react-icons/fa";
import "../styles/LoginPage.css"; // Import styles for registration page


export default function LoginPage() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userRole, setUserRole] = useState(""); // State to store user role

    const openRegistrationModal = () => {
        setShowLoginModal(true);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleRoleChange = (event) => {
        setUserRole(event.target.value);
    };

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
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
                        <button type="submit">Prihlásiť sa</button>
                    </form>
                    <p className="register-prompt">
                        Nemáš účet? <span onClick={openRegistrationModal} className="register-link">Vytvor si ho!</span>
                    </p>
                </div>
            </div>

            {/* Registration Modal */}
            {showLoginModal && (
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
                            <div className="role-selection">
                                <p>Vyber svoju rolu:</p>
                                <label className={`role-option ${userRole === "student" ? "selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={userRole === "student"}
                                        onChange={handleRoleChange}
                                    />
                                    <div className="role-icon">
                                        <FaUserAlt /> {/* Иконка для студента */}
                                    </div>
                                    <span>Študent</span>
                                </label>
                                <label className={`role-option ${userRole === "teacher" ? "selected" : ""}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="teacher"
                                        checked={userRole === "teacher"}
                                        onChange={handleRoleChange}
                                    />
                                    <div className="role-icon">
                                        <FaUserGraduate /> {/* Иконка для учителя */}
                                    </div>
                                    <span>Učiteľ</span>
                                </label>
                            </div>

                            <button type="submit">Zaregistrovať sa</button>
                        </form>
                        <button onClick={closeLoginModal} className="close-modal">Zatvoriť</button>
                    </div>
                </div>
            )}
        </div>
    );
}
