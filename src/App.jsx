import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faInfoCircle, faPhone, faUser, faTools, faClipboardCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/Courses";
import MotivationPage from "./pages/MotivationPage";
import RegistrationPage from "./pages/RegistrationPage"; // Import the new page
import "./styles/index.css";

function MainContent() {
  return (
    <>
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
              <Link to="/register" className="register-icon-link">
                <FontAwesomeIcon icon={faUser} size="lg" /> {/* Reduced size */}
              </Link>
</li>

          </ul>
        </nav>

        <div className="banner">
          <h1>Learn and Connect with Low-Power Technology</h1>
          <p>Preskúmajte svet LPWAN a zlepšite svoje vedomosti.</p>
          <a href="#courses" className="cta-primary">
            Zistiť viac
          </a>
        </div>
      </header>

      <main>
        <section id="courses" className="courses">
          <h2>Prečo práve tento kurz?</h2>
          <div className="course-cards">
            <div className="card">
              <FontAwesomeIcon icon={faTools} className="card-icon" />
              <h3>Praktické zručnosti</h3>
              <p> Kurz poskytuje praktické zručnosti a znalosti...</p>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faClipboardCheck} className="card-icon" />
              <h3>Možnosť otestovať sa</h3>
              <p>Študenti majú príležitosť otestovať svoje vedomosti...</p>
            </div>
            <div className="card">
              <FontAwesomeIcon icon={faLightbulb} className="card-icon" />
              <h3>Inovácie a aktuálnosť</h3>
              <p>Kurz je zameraný na najnovšie trendy a technológie...</p>
            </div>
          </div>
        </section>

        <section id="easy-steps" className="easy-steps">
          <h2 className="easy-steps__title">Tvoje jednoduché kroky</h2>
          <div className="step-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step__title">Získaj základné informácie</h3>
                <p className="step__text">Prečítaj si úvod do LPWAN...</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step__title">Zaregistruj sa a získaj viac možností</h3>
                <p className="step__text">Ako registrovaný používateľ...</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step__title">Otestuj sa, aby si preveril svoje vedomosti</h3>
                <p className="step__text">Po každej prečítanej téme nezabudni absolvovať test...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/motivation" element={<MotivationPage />} />
          <Route path="/register" element={<RegistrationPage />} /> {/* Add this route */}
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 Daria Loboda. All rights reserved.</p>
            <ul className="social-links">
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
