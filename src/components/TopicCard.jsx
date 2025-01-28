import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaQuestionCircle } from "react-icons/fa"; // Іконка для редагування, перегляду та питання

export default function TopicCard({ topic }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/course/${topic.id}`); // Перегляд курсу
  };

  const handleEditNavigate = (e) => {
    e.stopPropagation(); // Зупиняємо "бульбашку" події, щоб не спрацьовувало handleNavigate
    navigate(`/edit-course/${topic.id}`); // Перехід на сторінку редагування
  };

  const handleTestNavigate = (e) => {
    e.stopPropagation(); // Зупиняємо "бульбашку" події
    navigate(`/test/${topic.id}`); // Перехід на сторінку тестування
  };

  return (
    <div
      className="topic-card"
      onClick={handleNavigate} // Відкриваємо курс при кліку на картку
      style={{
        cursor: "pointer",
        position: "relative",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      <div className="img-cover topic-card-img-hold">
        <img
          src={`img/courses/${topic.img}`}
          alt={topic.title}
          className="topic-card-img"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
      <h3 className="topic-title">{topic.title}</h3>
      <p className="topic-description">{topic.description}</p>

      {/* Кнопка для перегляду курсу */}
      <div
        className="view-icon"
        onClick={handleNavigate}
        style={{
          position: "absolute",
          top: "10px",
          right: "90px", // Зміщуємо іконку перегляду
          cursor: "pointer",
          background: "#fff",
          padding: "5px",
          borderRadius: "50%",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaEye size={18} color="blue" />
      </div>

      {/* Іконка для редагування курсу */}
      <div
        className="edit-icon"
        onClick={handleEditNavigate}
        style={{
          position: "absolute",
          top: "10px",
          right: "50px", // Зміщуємо іконку редагування
          cursor: "pointer",
          background: "#fff",
          padding: "5px",
          borderRadius: "50%",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaEdit size={18} color="green" />
      </div>

      {/* Іконка для тестування курсу */}
      <div
        className="test-icon"
        onClick={handleTestNavigate}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px", // Зміщуємо іконку тестування
          cursor: "pointer",
          background: "#fff",
          padding: "5px",
          borderRadius: "50%",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaQuestionCircle size={18} color="orange" />
      </div>
    </div>
  );
}
