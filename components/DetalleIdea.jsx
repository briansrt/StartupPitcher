import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';

export default function DetalleIdea() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    pitch: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/getIdeaId/${id}`);
        const data = await res.json();
        setIdea(data);
        setForm({
          titulo: data.titulo,
          descripcion: data.descripcion,
          pitch: data.pitch || ''
        });
      } catch (err) {
        console.error('Error al cargar la idea', err);
      }
    };

    fetchIdea();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/editarIdea/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        const updated = await res.json();
        setIdea(updated);
        setEditMode(false);
        toast.success("Idea actualizada correctamente");
      } else {
        toast.error("Error al actualizar la idea");
      }
    } catch (err) {
      console.error("Error al guardar cambios:", err);
      toast.error("Error de conexión");
    }
  };

  if (!idea) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-600 hover:underline cursor-pointer"
      >
        ← Volver
      </button>

      <div className="mb-6 flex justify-between items-start">
        {editMode ? (
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="text-3xl font-bold text-indigo-800 mb-4 w-full border border-indigo-300 rounded px-2 py-1"
          />
        ) : (
          <h1 className="text-3xl font-bold text-indigo-800 mb-4">{idea.titulo}</h1>
        )}
        <button
          onClick={() => setEditMode(!editMode)}
          className="text-sm px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
        >
          {editMode ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Creada el: {new Date(idea.fecha).toLocaleDateString()}
      </p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Descripción</h2>
        {editMode ? (
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows={5}
            className="w-full border border-indigo-300 rounded p-2 text-gray-900"
          />
        ) : (
          <p className="text-gray-700">{idea.descripcion}</p>
        )}
      </div>

      {idea.aiFeedback && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Feedback de IA</h2>
          <div className="prose prose-sm text-gray-700">
            <ReactMarkdown>{idea.aiFeedback}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Pitch</h2>
        {editMode ? (
          <textarea
            name="pitch"
            value={form.pitch}
            onChange={handleChange}
            rows={4}
            className="w-full border border-indigo-300 rounded p-2 text-gray-900"
          />
        ) : (
          <p className="text-gray-700">{idea.pitch || "Aún no has creado un pitch."}</p>
        )}
      </div>

      {editMode && (
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Guardar Cambios
        </button>
      )}
    </div>
  );
}
