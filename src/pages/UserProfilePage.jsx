import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import UserRole from "../components/roles/user/UserRole";
import TeacherRole from "../components/roles/teacher/TeacherRole";
import AdminRole from "../components/roles/admin/AdminRole";


const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Úspešne ste sa odhlásili!");
    navigate("/", { state: { message: "Úspešne ste sa odhlásili!" } });
  };

  const roleComponents = {
    admin: <AdminRole />, 
    teacher: <TeacherRole />, 
    user: <UserRole />
  };

  return (
    <div className="page-profile">
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar">{user?.name?.[0] || "?"}</div>
          <h2 className="user-name">{user?.name || "Neznámy používateľ"}</h2>
          <p className="user-info">{user?.email || "Žiadny e-mail"}</p>
          <p className="user-info">Rola: {user?.role || "Neznáma"}</p>
          <div className="buttons">
            <Link className="button edit-btn" to="/edit-profile">
              Upraviť
            </Link>
            <button className="button logout-btn" onClick={handleLogout}>
              Odhlásiť sa
            </button>
          </div>
          <div className="role-section">
            {roleComponents[user?.role] || <p className="text-muted">Neznáma rola</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfilePage;
