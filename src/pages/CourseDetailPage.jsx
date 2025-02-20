import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl, extractYouTubeVideoId, getData } from "../utils/utils";
import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";
import { FaQuestionCircle, FaSun, FaMoon } from "react-icons/fa";
import parse from "html-react-parser";

export default function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [test, setTest] = useState(false);
  const isAuthenticated = localStorage.getItem("user");
  const { id } = useParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Завантаження стану теми
  });

  useEffect(() => {
    async function fetchCourseData() {
      const courseData = await getData(`${apiUrl.courseById}${id}`);
      setCourse(courseData);

      const testData = await getData(`${apiUrl.testsByCourse + id}`);
      setTest(testData);
    }
    fetchCourseData();
  }, [id]);

  // Функція для перемикання теми
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Збереження в localStorage
      return newMode;
    });
  };


  useEffect(() => {
    // Додавання або видалення класу в body
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleTestClick = () => {
    if (isAuthenticated) {
      navigate(`/test/${test.id}`);
    } else {
      navigate("/login");
    }
  };


  // Функція для отримання іконки в залежності від типу файлу
  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();
    switch (fileExtension) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📄";
      case "zip":
      case "rar":
        return "🗂️";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📁";
    }
  };

  return (
    <div className={`course-detail ${darkMode ? "dark-mode" : "light-mode"}`}>

      <div className="navigation-buttons" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={() => navigate(-1)}
          className="btn-back"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#007BFF" }}
          title=" Späť"
        >
          <AiOutlineArrowLeft />
        </button>

        <button
          onClick={() => navigate(`/edit-course/${id}`)}
          className="btn-edit"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#28a745" }}
          title="Upraviť"
        >
          <AiOutlineEdit />
        </button>

        {/* Іконка для тестування */}
        {/* <button
          onClick={() => navigate(`/test/${id}`)}
          className="btn-test"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#007BFF" }}
          title="Testovanie"
        >
          <FaQuestionCircle />
        </button> */}

        <button onClick={toggleTheme} className="theme-toggle" title="Zmeniť tému">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

      </div>
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>

      <div className="course-media">
        <img
          src={`/img/courses/${course.img ?? 'no-image.jpg'}`}
          alt="Nastavenie kurzu "
          className="course-image"
        />
      </div>



      {course.article && (
        <div className="course-article">
          <div className="typography">{parse(course.article)}</div>
        </div>
      )}

      {(course.video_link && typeof course.video_link === "string" && course.video_link !== "null") ? (
        <div className="course-media">
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(course.video_link)}`}
            title="Video kurzu"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : ''}

      {course.files && (
        <div className="course-resources">
          <h3>Ďalšie materiály:</h3>
          <ul className="file-list">
            {course.files.split(",").map((file, index) => (
              <li key={index} className="file-item">
                <span className="file-icon">{getFileIcon(file)}</span>
                <a
                  href={`/files/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-link"
                  download
                >
                  {/* file.split("/").pop() */}
                  {`Študijný materiál ${index + 1}`}
                </a>
                <a
                  href={`/files/${file}`}
                  download
                  className="file-download"
                >
                  ⬇️ Stiahnuť
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="course-meta">
        <p>
          <strong>Vytvorené: </strong>{" "}
          {new Date(course.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Autor:</strong> Користувач #{course.created_by}
        </p>
      </div>

      {test && (
        <div className="course-tests">
          <button onClick={handleTestClick} className="btn-test">
            Otestovat sa
          </button>

        </div>
      )}
    </div>
  );
}
