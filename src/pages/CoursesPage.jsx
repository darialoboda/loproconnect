import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faClipboardCheck, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header"; // Импортируем Header
import Container from '../components/Container';
// import "../styles/CoursesPage.css"; // Predpokladáme, že štýly sú v CSS súbore

export default function CoursesPage() {
  return (
    <section className="page-courses">
      <Container>
        <div className="content-hold">
          <div className="content">
            <h2 className='title'>Leading companies<br />have trusted us</h2>
            <div className="courses-list">
              <div className="card">
                <div className="card-inner" style={{ "--clr": "#fff" }}>
                  <div className="box">
                    <div className="imgBox">
                      <img
                        src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Trust & Co."
                      />
                    </div>
                    <div className="icon">
                      <a href="#" className="iconBox">
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h3> Úvod do LPWAN technológií </h3>
                  <p>Základný prehľad o nízkoenergetických sieťach a ich úlohe v moderných IoT aplikáciách.</p>
                  <ul>
                    <li style={{ "--clr-tag": "#d3b19a" }} className=" LPWAN"> LPWAN</li>
                    <li style={{ "--clr-tag": "#70b3b1" }} className="IoT">IoT</li>
                  </ul>
                </div>
              </div>
              <div className="card">
                <div className="card-inner" style={{ "--clr": "#fff" }}>
                  <div className="box">
                    <div className="imgBox">
                      <img
                        src="https://images.unsplash.com/photo-1613235788366-270e7ac489f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Tonic"
                      />
                    </div>
                    <div className="icon">
                      <a href="#" className="iconBox">
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h3>LTE-M: IoT na mobilných sieťach</h3>
                  <p>Vysvetlenie, ako LTE-M umožňuje energeticky úsporné pripojenie s mobilnými sieťami.
                  Kľúčové slová: LTE-M, mobilné siete</p>
                  <ul>
                    <li style={{ "--clr-tag": "#d3b19a" }} className="LTE-M">LTE-M</li>
                    <li style={{ "--clr-tag": "#d05fa2" }} className="mobilné siete">mobilné siete</li>
                  </ul>
                </div>
              </div>
              <div className="card">
                <div className="card-inner" style={{ "--clr": "#fff" }}>
                  <div className="box">
                    <div className="imgBox">
                      <img
                        src="https://images.unsplash.com/photo-1673847401561-fcd75a7888c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Shower Gel"
                      />
                    </div>
                    <div className="icon">
                      <a href="#" className="iconBox">
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h3>Wi-Fi HaLow: Wi-Fi budúcnosti</h3>
                  <p>Objasnenie technológie Wi-Fi HaLow, ktorá poskytuje dlhší dosah a nižšiu spotrebu energie.</p>
                  <ul>
                    <li style={{ "--clr-tag": "#d3b19a" }} className="Wi-Fi HaLow">Wi-Fi HaLow</li>
                    <li style={{ "--clr-tag": "#70b3b1" }} className=" nízka spotreba"> nízka spotreba</li>

                  </ul>
                </div>
              </div>
              <div className="card">
                <div className="card-inner" style={{ "--clr": "#fff" }}>
                  <div className="box">
                    <div className="imgBox">
                      <img
                        src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Trust & Co."
                      />
                    </div>
                    <div className="icon">
                      <a href="#" className="iconBox">
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h3> Úvod do LPWAN technológií </h3>
                  <p>Základný prehľad o nízkoenergetických sieťach a ich úlohe v moderných IoT aplikáciách.</p>
                  <ul>
                    <li style={{ "--clr-tag": "#d3b19a" }} className=" LPWAN"> LPWAN</li>
                    <li style={{ "--clr-tag": "#70b3b1" }} className="IoT">IoT</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

