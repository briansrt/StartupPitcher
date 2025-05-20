import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';

export default function PitchIA() {
  const { user } = useUser();
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [pitchOriginal, setPitchOriginal] = useState('');
  const [pitchMejorado, setPitchMejorado] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Obtener las ideas del usuario
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`https://startup-pitcher-back.vercel.app/api/misIdeas/${user.id}`);
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        toast.error('Error al cargar las ideas' | error.message);
      }
    };

    fetchIdeas();
  }, [user.id]);

  // Cuando cambia la idea seleccionada
  useEffect(() => {
    const idea = ideas.find((i) => i._id === selectedIdeaId);
    setSelectedIdea(idea || null);
    setPitchOriginal('');
    setPitchMejorado('');
  }, [selectedIdeaId, ideas]);

  const handleMejorarPitch = async () => {
    if (!pitchOriginal.trim()) {
      toast.error('Introduce un pitch primero.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://startup-pitcher-back.vercel.app/chatbot/mejorarPitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch: pitchOriginal }),
      });

      const data = await res.json();
      if (res.ok) {
        setPitchMejorado(data.pitchMejorado);
        toast.success('¡Pitch mejorado!');
      } else {
        toast.error(data.message || 'Error al mejorar el pitch');
      }
    } catch (error) {
      toast.error('Error de conexión' | error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarPitch = async () => {
    if (!selectedIdeaId || !pitchMejorado) return;

    setSaving(true);
    try {
      const res = await fetch(`https://startup-pitcher-back.vercel.app/chatbot/guardarPitch`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaId: selectedIdeaId,
          pitch: pitchMejorado,
        }),
      });

      if (res.ok) {
        toast.success('Pitch guardado con éxito');
      } else {
        toast.error('No se pudo guardar el pitch');
      }
    } catch (err) {
      toast.error('Error de conexión' | err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">Mejora tu Pitch con IA</h2>

      {/* Selección de idea */}
      <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona una de tus ideas</label>
      <select
        className="w-full mb-4 border rounded px-3 py-2 text-gray-900"
        value={selectedIdeaId}
        onChange={(e) => setSelectedIdeaId(e.target.value)}
      >
        <option value="">-- Selecciona una idea --</option>
        {ideas.map((idea) => (
          <option key={idea._id} value={idea._id}>
            {idea.titulo}
          </option>
        ))}
      </select>

      {/* Descripción de la idea */}
      {selectedIdea && (
        <div className="bg-indigo-50 border border-indigo-200 rounded p-4 mb-4">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">Descripción de la idea:</h3>
          <p className="text-gray-700 text-sm">{selectedIdea.descripcion}</p>
        </div>
      )}

      {/* Pitch original */}
      <label className="block text-sm font-medium text-gray-700 mb-1">Tu pitch actual</label>
      <textarea
        rows={4}
        disabled={!selectedIdeaId}
        className="w-full border rounded p-3 mb-4 text-sm text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
        value={pitchOriginal}
        onChange={(e) => setPitchOriginal(e.target.value)}
        placeholder={
            !selectedIdeaId
            ? "Selecciona una idea primero..."
            : "Escribe tu pitch aquí..."
        }
      />

      <button
        onClick={handleMejorarPitch}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Mejorando...' : 'Mejorar Pitch con IA'}
      </button>

      {/* Resultado del pitch mejorado */}
      {pitchMejorado && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded p-4">
          <h4 className="text-lg font-semibold text-green-700 mb-2">Pitch Mejorado:</h4>
          <div className="text-sm text-gray-800 whitespace-pre-wrap">
            <Markdown>
              {pitchMejorado}
            </Markdown>
          </div>

          <button
            onClick={handleGuardarPitch}
            disabled={saving}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Pitch Mejorado'}
          </button>
        </div>
      )}
    </div>
  );
}
