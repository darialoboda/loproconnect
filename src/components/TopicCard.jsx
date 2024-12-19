import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLaptopCode, faSignal, faCog, faUserTie, faCloud, faMicrochip, faSearch, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function TopicCard({ topic, onDelete }) {
  return (
    <div className="topic-card">
        <FontAwesomeIcon icon={faCloud} className="topic-icon" />
        <h3 className="topic-title">{topic.title}</h3>
        <p className="topic-description">{topic.description}</p>
        <Link to={`/course/${topic.id}`} className="btn-view-course">Prehliadnuť kurz</Link>
        <button onClick={() => onDelete(topic.id)} className="btn-delete-course">Odstrániť kurz</button>
    </div>
  )
}
