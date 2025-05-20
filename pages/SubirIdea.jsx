import React, { useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

export default function SubirIdea() {
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDescription, setNewIdeaDescription] = useState('');
  const [listening, setListening] = useState(false);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { user } = useUser();

  const recognitionRef = useRef(null);

  const handleNewIdeaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/crearIdeas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          username: user.firstName,
          titulo: newIdeaTitle,
          descripcion: newIdeaDescription,
          timezone,
        }),
      });
      if (response.ok) {
        setNewIdeaTitle('');
        setNewIdeaDescription('');
        toast.success('¡Idea guardada con éxito!');
      } else {
        toast.error('Error al guardar la idea. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al guardar la idea:', error);
      toast.error('Error de conexión con el servidor');
    }
  };

  const handleStartListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
  let interimTranscript = '';
  let finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript + ' ';
    } else {
      interimTranscript += transcript;
    }
  }

  // Solo actualizamos el estado cuando hay algo final confirmado
  if (finalTranscript.trim()) {
    setNewIdeaDescription((prev) => (prev + ' ' + finalTranscript).trim());
  }

  // Mostrar temporalmente lo que se está diciendo (sin guardarlo permanentemente)
  const livePreview = document.getElementById('livePreview');
  if (livePreview) {
    livePreview.innerText = interimTranscript;
  }
};


      recognitionRef.current.onerror = (event) => {
        console.error('Error en reconocimiento:', event.error);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    recognitionRef.current.start();
    setListening(true);
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
      <div className="p-6 bg-white rounded-lg shadow-sm min-h-screen">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Subir Nueva Idea</h2>
        <form onSubmit={handleNewIdeaSubmit} className="space-y-5">
          <div>
            <label htmlFor="ideaTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Título de la Idea
            </label>
            <input
              type="text"
              id="ideaTitle"
              value={newIdeaTitle}
              onChange={(e) => setNewIdeaTitle(e.target.value)}
              className="mt-1 text-gray-950 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ej. App de gestión de proyectos"
              required
            />
          </div>
          <div>
            <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción Detallada
            </label>
            <div className="flex gap-2 items-start">
              <textarea
                id="ideaDescription"
                rows={5}
                value={newIdeaDescription}
                onChange={(e) => setNewIdeaDescription(e.target.value)}
                className="mt-1 text-gray-950 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe tu idea, sus funcionalidades principales y el problema que resuelve."
                required
              ></textarea>
              <button
                type="button"
                onClick={listening ? handleStopListening : handleStartListening}
                className={`mt-1 px-3 py-2 rounded shadow text-white transition cursor-pointer ${
                  listening ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {listening ? '🛑' : '🎤'}
              </button>
            </div>
            {listening && (
              <p id="livePreview" className="mt-2 text-sm italic text-gray-500 h-5"></p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            Guardar Idea
          </button>
        </form>
      </div>
  );
}
