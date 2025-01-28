import React, { useState } from "react";
import { FaUserAlt, FaLock, FaUserGraduate } from "react-icons/fa";
import Container from "../components/Container";

export default function RegistrationPage() {
    const [userRole, setUserRole] = useState(""); // State to store user role

    const handleRoleChange = (event) => {
        setUserRole(event.target.value);
    };

    return (
        <div className='page-registration'>
            <Container>
                <div className="content-hold">
                    <div className="registration-container">
                        <div className="registration-box">
                            <h2>Vytvorit si konto</h2>
                            <form>
                                <div className="input-group">
                                    {/* <div className="icon"><FaUserAlt /></div> */}
                                    <input type="text" placeholder="Tvoje meno : " required className="input" style={{ width: '300px', margin: '0 auto' }} />
                                </div>
                                <div className="input-group">
                                    {/* <div className="icon"><FaUserAlt /></div> */}
                                    <input type="email" placeholder="Email" required className="input" style={{ width: '300px', margin: '0 auto' }} />
                                </div>
                                <div className="input-group">
                                    {/* <div className="icon"><FaLock /></div> */}
                                    <input type="password" placeholder="Heslo" required className="input" style={{ width: '300px', margin: '0 auto' }} />
                                </div>
                                <div className="role-selection" style={{ textAlign: 'center' }}>
                                    <p>Vyber svoju rolu:</p>
                                    <div className="role-options" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                        <label className={`role-option ${userRole === "student" ? "selected" : ""}`} style={{ cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={userRole === "student"}
                                                onChange={handleRoleChange}
                                            />
                                            <div className="role-icon" style={{ textAlign: 'center', margin: '5px 0' }}>
                                                <FaUserAlt size={30} />
                                            </div>
                                            <span>Študent</span>
                                        </label>
                                        <label className={`role-option ${userRole === "teacher" ? "selected" : ""}`} style={{ cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value="teacher"
                                                checked={userRole === "teacher"}
                                                onChange={handleRoleChange}
                                            />
                                            <div className="role-icon" style={{ textAlign: 'center', margin: '5px 0' }}>
                                                <FaUserGraduate size={30} />
                                            </div>
                                            <span>Učiteľ</span>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" style={{ width: '150px', margin: '20px auto', display: 'block', backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Zaregistrovať sa</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
