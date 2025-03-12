import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { apiUrl, getData } from "../../../utils/utils";

export default function Analytics({user}) {
  const [stats, setStats] = useState({
    active_students: 0,
    completed_courses: 0,
    average_progress: 0,
  });

  useEffect(() => {
    async function getAnalytics() {
      const data = await getData(apiUrl.teacherAnalytics + user.id);
      if (!data?.error) {
        setStats(data);
      }
    }
    getAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">📊 Статистика</h1>
      
      {/* Картки статистики */}
      <div className="stats-grid">
        <StatCard title="Активні студенти" value={stats.active_students} subtitle="Унікальні користувачі" />
        <StatCard title="Пройдені курси" value={stats.completed_courses} subtitle="Кількість курсів" />
        <StatCard title="Середній прогрес" value={`${stats.average_progress}%`} subtitle="Середній бал" />
      </div>
      
      {/* Графік (залишаємо поки тестові дані, бо їх немає в БД) */}
      <div className="chart-container">
        <h2 className="chart-title">📈 Динаміка активності студентів</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[{ name: "Тиждень 1", students: stats.active_students }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Компонент картки статистики
function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
      <p className="stat-subtitle">{subtitle}</p>
    </div>
  );
}
