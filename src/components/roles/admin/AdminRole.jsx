import { useState, lazy, Suspense } from "react";
import Loading from "../Loading";

const Users = lazy(() => import("./Users"));
const Courses = lazy(() => import("./Courses"));
const Statistics = lazy(() => import("./Statistics"));
const Messages = lazy(() => import("./Messages"));

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (index) => {
    setLoading(true);
    setTimeout(() => {
      setTab(index);
      setLoading(false);
    }, 400); 
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="tabs">
        {['Users', 'Courses', 'Statistics', 'Messages'].map((label, index) => (
          <button
            key={index}
            className={`tab-button ${tab === index ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {loading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            {tab === 0 && <Users />}
            {tab === 1 && <Courses />}
            {tab === 2 && <Statistics />}
            {tab === 3 && <Messages />}
          </Suspense>
        )}
      </div>
    </div>
  );
}

