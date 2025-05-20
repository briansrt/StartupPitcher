import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

export default function IdeaCard({ idea, onDelete, onPublicar }) {
    const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const maxChars = 200;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedText =
    idea.aiFeedback && idea.aiFeedback.length > maxChars
      ? idea.aiFeedback.slice(0, maxChars) + '...'
      : idea.aiFeedback;

  const handleNavigate = () => {
    navigate('/FeedbacksIdeas');
  };
  const handleCardClick = () => {
    navigate(`/MisIdeas/${idea._id}`);
  };

  return (
    <div
      className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition"
      onClick={handleCardClick}
    >
      <div className="mb-3">
        <h3 className="text-xl font-semibold text-indigo-800 mb-1">{idea.titulo}</h3>
        <p className="text-gray-700 text-sm">{idea.descripcion}</p>
        <p className="text-gray-500 text-xs mt-2">Creada el: {new Date(idea.fecha).toISOString().split('T')[0]}</p>
      </div>

      {/* Botones con event.stopPropagation() */}
      <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onDelete(idea._id)}
          className="bg-red-500 text-white text-sm rounded-md px-4 py-2 hover:bg-red-600 transition duration-200 cursor-pointer"
        >
          Eliminar Idea
        </button>
        <button
          onClick={() => onPublicar(idea._id, idea.estado)}
          className={`${
            idea.estado === "publico"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white text-sm rounded-md px-4 py-2 transition duration-200 ml-2 cursor-pointer`}
        >
          {idea.estado === "publico" ? "Publicado" : "Publicar"}
        </button>
      </div>

      {/* Feedback AI */}
      {idea.aiFeedback && (
        <div className="mt-4 p-3 bg-indigo-100 rounded-md border border-indigo-200">
          <h4 className="font-medium text-indigo-700 text-sm mb-1">Feedback de IA:</h4>
          <div className="text-gray-700 text-sm prose prose-indigo max-w-none">
            <ReactMarkdown>
              {isExpanded ? idea.aiFeedback : truncatedText}
            </ReactMarkdown>
          </div>
          {idea.aiFeedback.length > maxChars && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="mt-2 text-indigo-600 hover:underline text-sm cursor-pointer"
            >
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
      )}

      {!idea.aiFeedback && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
          className="mt-4 px-4 py-2 bg-indigo-500 cursor-pointer text-white text-sm rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Solicitar Feedback IA
        </button>
      )}
    </div>
  );
}
