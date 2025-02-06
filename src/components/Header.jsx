import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faInfoCircle, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Container from "./Container";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <Container>
        <nav className="navbar">
          <Link to="/" className="logo">LoProConnect</Link>
          <ul className="nav-links">
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Domov
              </Link>
            </li>
            <li>
              <Link to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> O stránke
              </Link>
            </li>
            <li>
              <Link to="/courses">
                <FontAwesomeIcon icon={faBook} /> Kurz
              </Link>
            </li>
            <li>
              <Link to="/motivation">
                <FontAwesomeIcon icon={faPhone} /> Motivácia
              </Link>
            </li>
            <li>
              <Link to={user ? "/profile" : "/login"} className="register-icon-link">
                <FontAwesomeIcon icon={faUser} size="lg" />
                {user && <span className="username"> {user.name}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
