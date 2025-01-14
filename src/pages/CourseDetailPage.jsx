import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiUrl, getData } from '../utils/utils';

export default function CourseDetailPage() {
  const [course, setCourse] = useState({})  
  const [tests, setTests] = useState([]); // Додаємо стан для тестів
  // Отримуємо параметр з посилання який курс потрібно показати
  const { id } = useParams();
  
      
  useEffect(() => {
    async function fetchCourseData() {
      const courseData = await getData(`${apiUrl.courseById}${id}`);
      setCourse(courseData);

      // Отримуємо тести для курсу
      const testsData = await getData(`${apiUrl.testsByCourse}${id}`);
      setTests(testsData);
    }
    fetchCourseData();
  }, [id]);

    
  

  return (
    <div className="course-detail">
      {/* Кнопка повернення */}
      <Link to="/courses" className="btn-back">
        ← Späť na zoznam
      </Link>

      {/* Назва курсу */}
      <h2 className="course-title">{course.title}</h2>

      {/* Опис курсу */}
      <p className="course-description">{course.description}</p>

      {/* Медіа контент */}
      {course.video_link ? (
        <div className="course-media">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${course.video_link}`}
            title="Video kurzu"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="course-media">
          <img
            src="https://picsum.photos/848/565"
            alt="Course preview"
            className="course-image"
          />
        </div>
      )}


      {/* Додаткові матеріали */}
      {course.files && (
        <div className="course-resources">
          <p>
            <strong>Ďalšie materiály: </strong>
            <a
              href={course.files}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-download"
            >
              Stiahnuť materiály
            </a>
          </p>
        </div>
      )}

      {/* Мета-інформація */}
      <div className="course-meta">
        <p>
          <strong>Vytvorené:</strong>{' '}
          {new Date(course.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Autor:</strong> Používateľ #{course.created_by}
        </p>
      </div>

      {/* Кнопка для тестування */}
      {/* Список тестів */}
      {tests.length > 0 && (
        <div className="course-tests">
          <h3>Témy na testovanie</h3>
          <ul>
            {tests.map((test) => (
              <li key={test.id}>
                <Link to={`/tests/${test.id}`} className="btn-test">
                  {test.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

