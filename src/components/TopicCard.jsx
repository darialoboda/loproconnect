import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa"; // Іконка для редагування та перегляду

export default function TopicCard({ topic }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/course/${topic.id}`); // Перегляд курсу
  };

  const handleEditNavigate = (e) => {
    e.stopPropagation(); // Зупиняємо "бульбашку" події, щоб не спрацьовувало handleNavigate
    navigate(`/edit-course/${topic.id}`); // Перехід на сторінку редагування
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
          right: "50px",
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
          right: "10px",
          cursor: "pointer",
          background: "#fff",
          padding: "5px",
          borderRadius: "50%",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaEdit size={18} color="green" />
      </div>
    </div>
  );
}
