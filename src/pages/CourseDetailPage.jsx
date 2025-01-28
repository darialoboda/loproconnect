import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl, getData } from "../utils/utils";
import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";

export default function CourseDetailPage() {
  const [course, setCourse] = useState({});
  const [tests, setTests] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourseData() {
      const courseData = await getData(`${apiUrl.courseById}${id}`);
      setCourse(courseData);

      const testsData = await getData(`${apiUrl.testsByCourse}${id}`);
      setTests(testsData);
    }
    fetchCourseData();
  }, [id]);

  // Funkcia na získanie ikony podľa typu súboru
  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();
    switch (fileExtension) {
      case "pdf":
        return "📄"; // PDF ikona
      case "doc":
      case "docx":
        return "📄"; // Dokument Word
      case "zip":
      case "rar":
        return "🗂️"; // Archív
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️"; // Obrázok
      default:
        return "📁"; // Všeobecná ikona pre iné súbory
    }
  };

  return (
    <div className="course-detail">
     <div className="navigation-buttons" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <button
    onClick={() => navigate(-1)}
    className="btn-back"
    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#007BFF" }}
    title="Späť na kurzy"
  >
    <AiOutlineArrowLeft />
  </button>

  <button
    onClick={() => navigate(`/edit-course/${id}`)}
    className="btn-edit"
    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#28a745" }}
    title="Upraviť kurz"
  >
    <AiOutlineEdit />
  </button>
</div>


      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>

      {course.img ? (
        <div className="course-media">
          <img
            src={course.img}
            alt="Náhľad kurzu"
            className="course-image"
          />
        </div>
      ) : (
        <div className="course-media">
          <p>Obrázok nie je dostupný.</p>
        </div>
      )}

      {course.video_link && (
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
      )}

      {course.article && (
        <div className="course-article">
          <h3>Článok:</h3>
          <p>{course.article}</p>
        </div>
      )}

      {course.files && (
        <div className="course-resources">
          <h3>Ďalšie materiály:</h3>
          <ul className="file-list">
            {course.files.split(",").map((file, index) => (
              <li key={index} className="file-item">
                <span className="file-icon">{getFileIcon(file)}</span>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-link"
                >
                  {file.split("/").pop()} {/* Názov súboru */}
                </a>
                <a
                  href={file}
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
          <strong>Vytvorené:</strong>{" "}
          {new Date(course.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Autor:</strong> Používateľ #{course.created_by}
        </p>
      </div>

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
