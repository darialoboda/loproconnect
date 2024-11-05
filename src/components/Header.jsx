// src/components/Header.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faInfoCircle, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Подключаем стили для Header

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">LoProConnect</div>
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
            <a href="#login" className="cta-button">
              <FontAwesomeIcon icon={faUser} /> Zaregistrovat sa
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
