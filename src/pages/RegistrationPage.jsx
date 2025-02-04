import React, { useState } from "react";
import { FaUserAlt, FaLock, FaUserGraduate } from "react-icons/fa";
import Container from "../components/Container";
import { apiUrl } from "../utils/utils";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        navigate('/profile');
    }

    const [userRole, setUserRole] = useState(""); // State to store user role
    const [username, setUsername] = useState(""); // State for username
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password

    const handleRoleChange = (event) => {
        setUserRole(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки

        const newUser = {
            name: username,
            email,
            password,
            role: userRole,
        };        

        try {
            const response = await fetch(apiUrl.register, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            console.log("response: ", response);

            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='page-registration'>
            <Container>
                <div className="content-hold">
                    <div className="registration-container">
                        <div className="registration-box">
                            <h2>Vytvorit si konto</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Tvoje meno : "
                                        required
                                        className="input"
                                        style={{ width: '300px', margin: '0 auto' }}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        className="input"
                                        style={{ width: '300px', margin: '0 auto' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <input
                                        type="password"
                                        placeholder="Heslo"
                                        required
                                        className="input"
                                        style={{ width: '300px', margin: '0 auto' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="role-selection" style={{ textAlign: 'center' }}>
                                    <p>Vyber svoju rolu:</p>
                                    <div className="role-options" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                        <label className={`role-option ${userRole === "user" ? "selected" : ""}`} style={{ cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="role"
                                                value="user"
                                                checked={userRole === "user"}
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

                                <button type="submit" style={{ width: '150px', margin: '20px auto', display: 'block', backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                    Zaregistrovať sa
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
