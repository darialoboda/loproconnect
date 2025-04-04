import React, { useEffect, useState } from "react";
import { apiUrl, getData } from "../../../utils/utils";

export default function Students({ user }) {
  const [users, setUsers] = useState([]);

    useEffect(() => {
      async function getUsers() {
        const data = await getData(apiUrl.usersTeacherStudents + user.id);
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
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="user-name">
                  <div className="user-info">
                    <span className="user-text">{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}