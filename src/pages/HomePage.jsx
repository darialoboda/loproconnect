import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faClipboardCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Container from "../components/Container";

export default function HomePage() {
  return (
    <div className="page-home">

      <section className="banner">
        <Container>
          <div className="banner-hold">
            <h1>Objavte svet technológií s nízkou spotrebou energie</h1>
            {/* <p>Preskúmajte svet LPWAN a zlepšite svoje vedomosti.</p> */}
            <a href="#courses" className="cta-primary">
              Zistiť viac
            </a>
          </div>
        </Container>
      </section>

      <section id="courses" className="courses">
        <Container>
          <div className="courses-hold">
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
          </div>
        </Container>
      </section>

      <section id="easy-steps" className="easy-steps">
        <Container>
          <div className="easy-steps-hold">
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
          </div>
        </Container>
      </section>
    </div>
  );
}