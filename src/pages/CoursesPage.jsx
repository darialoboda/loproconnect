import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLaptopCode, faSignal, faCog, faUserTie, faCloud, faMicrochip, faSearch, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Container from '../components/Container';
import { toast, ToastContainer } from "react-toastify"; // Імпорт ToastContainer і toast
import "react-toastify/dist/ReactToastify.css"; // Імпорт стилів для toastify

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { id: 1, title: "Čo je LPWAN? Úvod do technológie", icon: faSignal, keywords: ["LPWAN", "technológia", "IoT"] },
    { id: 2, title: "Čo je LTE-M?", icon: faLaptopCode, keywords: ["LTE-M", "mobilná sieť", "IoT"] },
    { id: 3, title: "Čo je Wi-Fi HaLow?", icon: faCloud, keywords: ["Wi-Fi HaLow", "technológia", "energetická efektívnosť"] },
    { id: 4, title: "Rozdiel medzi LPWAN, LTE-M a Wi-Fi HaLow", icon: faNetworkWired, keywords: ["LPWAN", "LTE-M", "Wi-Fi HaLow", "rozdiely"] },
    { id: 5, title: "Aplikácie LPWAN v IoT", icon: faBook, keywords: ["LPWAN", "IoT", "aplikácie"] },
    { id: 6, title: "Výhody a nevýhody LTE-M", icon: faCog, keywords: ["LTE-M", "výhody", "nevýhody"] },
    { id: 7, title: "Výhody a nevýhody Wi-Fi HaLow", icon: faMicrochip, keywords: ["Wi-Fi HaLow", "výhody", "nevýhody"] },
    { id: 8, title: "Porovnanie LPWAN a tradičných mobilných sietí", icon: faUserTie, keywords: ["LPWAN", "mobilné siete", "porovnanie"] },
    { id: 9, title: "Bezpečnosť v IoT sieťach", icon: faSignal, keywords: ["IoT", "bezpečnosť", "siete"] },
    { id: 10, title: "Budúcnosť LPWAN a IoT", icon: faSearch, keywords: ["LPWAN", "IoT", "budúcnosť"] },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredTopics = topics.filter(topic =>
    topic.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery))
  );

  const handleTopicClick = (topic) => {
    toast.info(`Informácie o téme "${topic.title}" budú čoskoro dostupné!`, {
      position: "top-center",
      autoClose: 3000, // Автозакриття через 3 секунди
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <section className="page-courses">
      <Container>
        <div className="content-hold">
          <h1 className="page-title">Kurzy LoProConnect</h1>
          <p className="page-description">
            Vyhľadajte konkrétny kurz podľa kľúčových slov alebo si vyberte tému.
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Vyhľadajte kurz..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>

          <div className="topics-grid">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="topic-card"
                onClick={() => handleTopicClick(topic)}
              >
                <FontAwesomeIcon icon={topic.icon} className="topic-icon" />
                <h3 className="topic-title">{topic.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <ToastContainer /> {/* Додано для відображення тостів */}
    </section>
  );
}
