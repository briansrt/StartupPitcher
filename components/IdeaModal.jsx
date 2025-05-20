import React from 'react';
import ReactMarkdown from 'react-markdown';

const IdeaModal = ({ isOpen, onClose, idea }) => {
  if (!isOpen || !idea) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-indigo-800 mb-4">{idea.titulo}</h2>

        <div className="mb-4">
          <h3 className="font-semibold text-sm text-indigo-600 mb-1">Descripción</h3>
          <p className="text-sm text-gray-700">{idea.descripcion}</p>
        </div>

        {idea.aiFeedback && (
          <div className="mb-4">
            <h3 className="font-semibold text-sm text-indigo-600 mb-1">Feedback de IA</h3>
            <div className="prose prose-sm text-gray-700">
                <ReactMarkdown>
                    {idea.aiFeedback}
                </ReactMarkdown>
            </div>
          </div>
        )}

        {idea.pitch && (
          <div>
            <h3 className="font-semibold text-sm text-indigo-600 mb-1">Pitch</h3>
            <p className="text-sm text-gray-800">{idea.pitch}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaModal;
