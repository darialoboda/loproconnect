import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiUrl, getData } from '../utils/utils';

export default function CourseDetailPage() {
  const [course, setCourse] = useState({})  

  // Отримуємо параметр з посилання який курс потрібно показати
  const { id } = useParams();
  
  // Отримуємо курс по id 
    useEffect(() => {
  
      async function getCourse() {
        const data = await getData(apiUrl.courseById + id);
        setCourse(data);
      }
      getCourse();
      
    }, [id])
  

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
      {/* {course.video_link ? (
        <div className="course-media">
          <iframe
            width="100%"
            height="400"
            src={course.video_link}
            title="Video kurzu"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="course-media">
          <img
            src="https://via.placeholder.com/800x400"
            alt="Course preview"
            className="course-image"
          />
        </div>
      )} */}

      <div className="course-media">
        <img
          src="https://via.placeholder.com/800x400"
          alt="Course preview"
          className="course-image"
        />
      </div>

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
      <button className="btn-test">Prejsť na test</button>
    </div>
  );
}
