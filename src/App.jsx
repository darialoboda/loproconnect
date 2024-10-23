import "./styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faInfoCircle, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTools, faClipboardCheck, faLightbulb } from '@fortawesome/free-solid-svg-icons';
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>

function App() {
  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
        <div className="logo">
  LoProConnect
</div>

          <ul className="nav-links">
            <li>
              <a href="#home">
                <FontAwesomeIcon icon={faHome} /> Domov
              </a>
            </li>
            <li>
              <a href="#about-lpwan">
                <FontAwesomeIcon icon={faInfoCircle} /> O stranke
              </a>
            </li>
            <li>
              <a href="#courses">
                <FontAwesomeIcon icon={faBook} /> Kurz
              </a>
            </li>
            <li>
              <a href="#contact">
                <FontAwesomeIcon icon={faPhone} /> Motivacia
              </a>
            </li>
            <li>
              <a href="#login" className="cta-button">
                <FontAwesomeIcon icon={faUser} /> Zaregistrovat sa 
              </a>
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
      <p> Kurz poskytuje praktické zručnosti a znalosti, ktoré sú potrebné pre úspešnú kariéru v oblasti LPWAN, vrátane praktických projektov a aplikácií.</p>
    </div>
    <div className="card">
      <FontAwesomeIcon icon={faClipboardCheck} className="card-icon" />
      <h3>Možnosť otestovať sa</h3>
      <p>Študenti majú príležitosť otestovať svoje vedomosti a zručnosti prostredníctvom rôznych testov a projektov, čo im pomáha lepšie pochopiť učivo a získať spätnú väzbu.</p>
    </div>
    <div className="card">
      <FontAwesomeIcon icon={faLightbulb} className="card-icon" />
      <h3>Inovácie a aktuálnosť</h3>
      <p>Kurz je zameraný na najnovšie trendy a technológie v oblasti LPWAN, čo umožňuje študentom zostať na špici inovácií a technologického pokroku.</p>
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
              <p className="step__text">Prečítaj si úvod do LPWAN a podrobnejšie sa oboznám s technológiami ako LTE-M a WiFi HaLow.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step__title">Zaregistruj sa a získaj viac možností</h3>
              <p className="step__text">Ako registrovaný používateľ budeš môcť vykonávať rôzne úlohy a sledovať svoj pokrok.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step__title">Otestuj sa, aby si preveril svoje vedomosti</h3>
              <p className="step__text">Po každej prečítanej téme nezabudni absolvovať test, aby si preveril svoje vedomosti.</p>
            </div>
          </div>
        </div>
        {/*<div className="steps-image">
          <img src="/img/Networks-300x202.jpg" alt="Illustration" />
        </div>*/}
        </section>
      </main>

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
  );
}

export default App;
