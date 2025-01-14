import { Link } from "react-router-dom";

export default function TopicCard({ topic, onDelete }) {
  return (
    <div className="topic-card">
        {/* <img src="https://picsum.photos/848/565" alt="" className="topic-card-img" /> */}
        <div className="img-cover topic-card-img-hold">
          <img src={`img/courses/${topic.img}`} alt="" className="topic-card-img" />
        </div>
        <h3 className="topic-title">{topic.title}</h3>
        <p className="topic-description">{topic.description}</p>
        <Link to={`/course/${topic.id}`} className="btn-view-course">Prehliadnuť kurz</Link>
        <button onClick={() => onDelete(topic.id)} className="btn-delete-course">Odstrániť kurz</button>
    </div>
  )
}
