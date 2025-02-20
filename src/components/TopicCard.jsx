import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaQuestionCircle, FaTrash, FaCross } from "react-icons/fa"; // Іконка для редагування, перегляду та питання
import { useAuth } from "../context/AuthContext";

export default function TopicCard({ topic, handleOpenModal }) {

  const { user } = useAuth();
  
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

  const handleDelTopic = (e) => {
    handleOpenModal(topic); // Перехід на сторінку тестування
  };

  return (
    <div className="topic-card">
      <div className="img-cover topic-card-img-hold" onClick={handleNavigate}>
        <img
          src={`/img/courses/${topic.img ?? 'no-image.jpg'}`}
          alt={topic.title}
          className="topic-card-img"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
      <div className="topic-card-text-hold">
        <h3 className="topic-title" onClick={handleNavigate}>{topic.title}</h3>
        <p className="topic-description">{topic.description}</p>
      </div>

      {
        user && 
          <div className="topic-actions">
            <div className="btn-action btn-action-view" onClick={handleNavigate}>
              <FaEye size={18} />
            </div>
            <div className="btn-action btn-action-edit" onClick={handleEditNavigate}>
              <FaEdit size={18} />
            </div>
            <div className="btn-action btn-action-test" onClick={handleTestNavigate}>
              <FaQuestionCircle size={18} />
            </div>
            <div className="btn-action btn-action-del" onClick={handleDelTopic}>
              <FaTrash size={18} />
            </div>
          </div>
      }
    </div>
  );
}
