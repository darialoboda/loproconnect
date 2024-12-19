import React, { useEffect, useState } from 'react';

import Container from '../components/Container';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCourseForm from './AddCourseForm'; 
import CourseDetailPage from './CourseDetailPage'; // Імпортуємо сторінку деталей курсу
import { apiUrl, getData } from '../utils/utils';
import TopicCard from '../components/TopicCard';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState([]);
  // const [courses, setCourses] = useState([]);
  // const [selectedCourse, setSelectedCourse] = useState(null); // Для відображення детального курсу

  // отримаємо дані з бази даних
  useEffect(() => {

    async function getCourses() {
      const data = await getData(apiUrl.courses);
      setTopics(data);
    }
    getCourses();
    
  }, [])
  
  
  // Робимо додатковий вивід через фільтрування
  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery)
  );
  

  

  // Функція для пошуку
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };
  

  // const topics = [
  //   { id: 1, title: "Čo je LPWAN? Úvod do technológie", icon: faSignal, description: "Základné informácie o LPWAN technológii.", keywords: ["LPWAN", "technológia", "IoT"] },
  //   { id: 2, title: "Čo je LTE-M?", icon: faLaptopCode, description: "Detailný popis LTE-M siete a jej výhod.", keywords: ["LTE-M", "mobilná sieť", "IoT"] },
  //   { id: 3, title: "Čo je Wi-Fi HaLow?", icon: faCloud, description: "Úvod do Wi-Fi HaLow a jej aplikácií.", keywords: ["Wi-Fi HaLow", "technológia", "energetická efektívnosť"] },
  //   // Додайте інші теми
  //   { id: 4, title: "Rozdiel medzi LPWAN, LTE-M a Wi-Fi HaLow", icon: faNetworkWired, keywords: ["LPWAN", "LTE-M", "Wi-Fi HaLow", "rozdiely"] },
  //   { id: 5, title: "Aplikácie LPWAN v IoT", icon: faBook, keywords: ["LPWAN", "IoT", "aplikácie"] },
  //   { id: 6, title: "Výhody a nevýhody LTE-M", icon: faCog, keywords: ["LTE-M", "výhody", "nevýhody"] },
  //   { id: 7, title: "Výhody a nevýhody Wi-Fi HaLow", icon: faMicrochip, keywords: ["Wi-Fi HaLow", "výhody", "nevýhody"] },
  //   { id: 8, title: "Porovnanie LPWAN a tradičných mobilných sietí", icon: faUserTie, keywords: ["LPWAN", "mobilné siete", "porovnanie"] },
  // ];


  


  // const handleAddCourse = (newCourse) => {
  //   setCourses((prevCourses) => [...prevCourses, newCourse]);
  // };

  // const handleViewCourse = (topic) => {
  //   setSelectedCourse(topic);
  // };

  // Видалення курсу
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl.courses}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id));
        toast.success('Kurz bol úspešne odstránený.');
      } else {
        toast.error('Nepodarilo sa odstrániť kurz.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Chyba pri odstraňovaní kurzu.');
    }
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
          </div>

          <div className="topics-grid">
            {filteredTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onDelete={() => handleDelete(topic.id)} />
            ))}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </section>
  );
}
