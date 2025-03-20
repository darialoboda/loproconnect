import React, { useEffect, useState } from "react";
import { apiUrl, getData, postData } from "../../../utils/utils";

export default function Messages() {
  const [teachers, setTeachers] = useState([]);
  console.log("teachers: ", teachers);

  useEffect(() => {
    async function fetchTeachers() {
      const data = await getData(apiUrl.adminTeachersUnpublish);
      setTeachers(data);
    }
    fetchTeachers();
  }, []);

  const handleStatusChange = async (teacherId, status) => {
    const response = await postData(apiUrl.adminTeachersUnpublish, { teacherId, publish: status });

    if (response && response.rowsAffected > 0) {
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== teacherId));
    }
  };

  return (
    <div className="users-container">
      <h3 className="title">Neaktívni učitelia</h3>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Meno</th>
              <th>Email</th>
              <th>Dátum registrácie</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id}>
                <td className="user-name">
                  <div className="user-info">
                    <span className="user-text">{teacher.name}</span>
                  </div>
                </td>
                <td>{teacher.email}</td>
                <td><small>{teacher.created_at.slice(0, 10)}</small></td>
                <td className="actions-cell">
                  <div className="actions-buttons">
                    <button className="activate-btn" onClick={() => handleStatusChange(teacher.id, "yes")}>
                      Aktivovať
                    </button>
                    <button className="reject-btn" onClick={() => handleStatusChange(teacher.id, "canceled")}>
                      Odmietnuť
                    </button>
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
