import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import RoleAdmin from "../components/userRole/RoleAdmin";
import RoleTeacher from "../components/userRole/RoleTeacher";
import RoleUser from "../components/userRole/RoleUser";

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  console.log("user: ", user);
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

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const roleComponents = {
    admin: <RoleAdmin />, 
    teacher: <RoleTeacher />, 
    user: <RoleUser />
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
            <button className="button edit-btn" onClick={handleEditProfile}>
              Upraviť
            </button>
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
