import React, { useEffect, useState } from "react";
import { apiUrl, getData } from "../../../utils/utils";
import { Link } from "react-router-dom";

export default function Users({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const data = await getData(apiUrl.users);
      setUsers(data);
    }
    getUsers();
  }, []);


  return (
    <div className="users-container">
      <h3 className="title">Správa používateľov</h3>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Meno</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Dátum registrácie</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            {users.map(userData => (
              userData.id === user.id
              ? ''
              :
                <tr key={userData.id}>
                  <td className="user-name">
                    <div className="user-info">
                      <span className="user-text">{userData.name}</span>
                    </div>
                  </td>
                  <td>{userData.email}</td>
                  <td>{userData.role}</td>
                  <td><small>{userData.created_at}</small></td>
                  <td className="actions-cell">
                    <div className="actions-buttons">
                      <Link to={`/edit-profile/${userData.id}`} className="edit-btn">Upraviť</Link>
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}