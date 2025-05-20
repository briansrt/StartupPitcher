import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import IdeaCard from '../components/IdeaCard'; // Ajustá el path según tu estructura

export default function MisIdeas() {
  const { user } = useUser();
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/SubirIdea');
  };

  const publicarIdea = async (ideaId, estadoActual) => {
    const nuevoEstado = estadoActual === "publico" ? "privado" : "publico";
    try {
      const response = await fetch(`http://localhost:4000/api/publicarIdea`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId, nuevoEstado }),
      });

      if (response.ok) {
        const updatedIdeas = ideas.map((idea) =>
          idea._id === ideaId ? { ...idea, estado: nuevoEstado } : idea
        );
        setIdeas(updatedIdeas);
        toast.success("¡Idea Publicada!");
      } else {
        const data = await response.json();
        toast.error(data.message || "No se pudo publicar la idea");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  const handleDelete = async (ideaId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/eliminarIdea/${ideaId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setIdeas(ideas.filter((idea) => idea._id !== ideaId));
        toast.success("Idea Eliminada");
      } else {
        const data = await response.json();
        toast.error(data.message || "No se pudo eliminar la idea");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      toast.error("Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/misIdeas/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setIdeas(data);
        } else {
          const data = await response.json();
          toast.error(data.message || "No se pudieron cargar las ideas");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        toast.error("Error de conexión con el servidor");
      }
    };

    if (user?.id) fetchIdeas();
  }, [user?.id]);

  return (
    <div className="p-6 bg-white shadow-sm min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Mis Ideas</h2>
        <button
          onClick={handleNavigate}
          type="button"
          className="flex justify-center items-center gap-1 cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Crear Nueva Idea
        </button>
      </div>

      {ideas.length === 0 ? (
        <p className="text-gray-600">Aún no tienes ideas. ¡Anímate a subir una!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              onDelete={handleDelete}
              onPublicar={publicarIdea}
            />
          ))}
        </div>
      )}
    </div>
  );
}
