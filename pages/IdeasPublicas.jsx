import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function IdeasPublicas() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchPublicIdeas = async () => {
      try {
        const res = await fetch('https://startup-pitcher-back.vercel.app/api/ideasPublicas');
        const data = await res.json();
        setIdeas(data);
      } catch (err) {
        console.error('Error al cargar ideas públicas', err);
      }
    };

    fetchPublicIdeas();
  }, []);

  return (
    <div className="p-6 bg-white shadow-sm min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">Ideas Públicas</h2>

      {ideas.length === 0 ? (
        <p className="text-gray-600">No hay ideas públicas por ahora.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div key={idea._id} className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100">
              <h3 className="text-xl font-semibold text-indigo-800 mb-1">{idea.titulo}</h3>
              <p className="text-sm text-gray-600 mb-2">Por: <span className="font-medium">{idea.username}</span></p>
              <p className="text-sm text-gray-700 mb-3">{idea.descripcion}</p>
              <p className="text-xs text-gray-500 mb-3">Fecha: {new Date(idea.fecha).toLocaleDateString()}</p>

              {idea.aiFeedback && (
                <div className="bg-indigo-100 p-3 rounded-md mb-3">
                  <h4 className="text-sm font-medium text-indigo-700 mb-1">Feedback IA:</h4>
                  <div className="text-sm text-gray-700 prose prose-indigo">
                    <ReactMarkdown>{idea.aiFeedback}</ReactMarkdown>
                  </div>
                </div>
              )}

              {idea.pitch && (
                <div className="bg-blue-100 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-blue-700 mb-1">Pitch:</h4>
                  <p className="text-sm text-gray-800 italic">{idea.pitch}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
