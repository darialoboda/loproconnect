import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


// Ukážkové údaje pre graf
const data = [
  { name: "Týždeň 1", students: 20 },
  { name: "Týždeň 2", students: 35 },
  { name: "Týždeň 3", students: 50 },
  { name: "Týždeň 4", students: 45 },
];

export default function Analytics() {
  return (
    <div className="analytics-container">
      <h1 className="analytics-title">📊 Štatistika</h1>
      
      {/* Karty s ukazovateľmi */}
      <div className="stats-grid">
        <StatCard title="Aktívni študenti" value="120" subtitle="+10 za týždeň" />
        <StatCard title="Dokončené kurzy" value="45" subtitle="+5 za mesiac" />
        <StatCard title="Priemerný pokrok" value="75%" subtitle="Priemerná hodnota" />
      </div>
      
      {/* Graf aktivity študentov */}
      <div className="chart-container">
        <h2 className="chart-title">📈 Dynamika aktivity študentov</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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

// Komponent karty
function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
      <p className="stat-subtitle">{subtitle}</p>
    </div>
  );
}
