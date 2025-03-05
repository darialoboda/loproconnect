import { useState, lazy, Suspense } from "react";
import Loading from "../Loading";
import { useAuth } from "../../../context/AuthContext";

const Students = lazy(() => import("./Students"));
const Courses = lazy(() => import("./Courses"));
const Analytics = lazy(() => import("./Analytics"));

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleTabChange = (index) => {
    setLoading(true);
    setTimeout(() => {
      setTab(index);
      setLoading(false);
    }, 400); 
  };

  return (
    <div className="dashboard-container">
      <div className="tabs">
        {['Students', 'Courses', 'Analytics'].map((label, index) => (
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
            {tab === 0 && <Students user={user} />}
            {tab === 1 && <Courses user={user} />}
            {tab === 2 && <Analytics user={user} />}
          </Suspense>
        )}
      </div>
    </div>
  );
}

