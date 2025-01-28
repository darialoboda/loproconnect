import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Container from "../components/Container";

export default function LoginPage() {
    return (
        <div className='page-login'>
            <Container>
                <div className="content-hold">
                    <div className="login-container">
                        <div className="login-box">
                            <h2>Prihlásiť sa</h2>
                            <form>
                                <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
                                    <div className="icon"><FaUserAlt /></div>
                                    <input type="email" placeholder="Tvoj email" required className="input" style={{ width: '300px' }} />
                                </div>
                                <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
                                    <div className="icon"><FaLock /></div>
                                    <input type="password" placeholder="Tvoje heslo" required className="input" style={{ width: '300px' }} />
                                </div>

                                <button type="submit" style={{ width: '150px', margin: '20px auto', display: 'block', backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Prihlásiť sa</button>
                            </form>
                            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                                Nemáš účet? <a href="/register" style={{ color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}>Vytvor si ho!</a>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
