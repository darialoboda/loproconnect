import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faClipboardCheck, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header"; // Импортируем Header

function Motivation() {
  return (
    <div>
      <Header />
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
    </div>
  );
}

export default Motivation;