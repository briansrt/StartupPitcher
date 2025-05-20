import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/estadisticas/${user.id}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error al cargar estadísticas", err);
      }
    };

    if (user?.id) fetchStats();
  }, [user]);

  if (!stats) return <div className="p-6">Cargando estadísticas...</div>;

  return (
    <div className="p-6 bg-white shadow-sm min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">Estadísticas de tus Ideas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total de Ideas" value={stats.total} color="bg-indigo-100" />
        <Card title="Con Feedback de IA" value={stats.conFeedback} color="bg-green-100" />
        <Card title="Pendientes de Feedback" value={stats.sinFeedback} color="bg-yellow-100" />
        <Card title="Con Pitch" value={stats.conPitch} color="bg-blue-100" />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-md`}>
      <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
      <p className="text-4xl font-bold text-indigo-900">{value}</p>
    </div>
  );
}
