import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Študent", registrationDate: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Študent", registrationDate: "2023-02-25" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Študent", registrationDate: "2022-11-10" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);

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
            {users.map(user => (
              <tr key={user.id}>
                <td className="user-name">
                  <div className="user-info">
                    <img src={`https://i.pravatar.cc/40?u=${user.id}`} alt={user.name} className="avatar" />
                    <span className="user-text">{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.registrationDate}</td>
                <td className="actions-cell">
                  <div className="actions-buttons">
                    <button className="edit-btn">Upraviť</button>
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