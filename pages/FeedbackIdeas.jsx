import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import { toast } from 'react-toastify';


export default function FeedbackIdeas() {
    const [ideas, setIdeas] = useState([]);
    const [selectedIdeaId, setSelectedIdeaId] = useState("");
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const { user } = useUser();

    const solicitarFeedbackIA = async (ideaId) => {
        setIsLoadingFeedback(true);
        try {
            const response = await fetch(`https://startup-pitcher-back.vercel.app/chatbot/FeedbackIdeas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ideaId })
            });

            const data = await response.json();

            if (response.ok) {
            // Actualiza estado en frontend
            const updatedIdeas = ideas.map(idea =>
                idea._id === ideaId ? { ...idea, aiFeedback: data.feedback } : idea
            );
            setIdeas(updatedIdeas);
            toast.success("Feedback recibido con éxito");
            } else {
            toast.error(data.message || "Error al solicitar feedback");
            }
        } catch (error) {
            console.error("Error al solicitar feedback:", error);
            toast.error("Error de red al solicitar feedback");
        } finally {
            setIsLoadingFeedback(false);
        }
    };


    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await fetch(`https://startup-pitcher-back.vercel.app/api/misIdeas/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
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
    
        fetchIdeas();
    }, [user.id]);

    return(
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">Feedback de IA</h2>
            <p className="text-gray-600">Aquí se mostrará el feedback detallado de la IA para tus ideas.</p>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Ideas con Feedback Pendiente</h3>
              {ideas.filter(idea => !idea.aiFeedback).length === 0 ? (
                <p className="text-gray-600 text-sm">Todas tus ideas tienen feedback o no hay ideas.</p>
              ) : (
                <ul className="list-disc pl-5 text-gray-700">
                  {ideas.filter(idea => !idea.aiFeedback).map(idea => (
                    <li key={idea._id} className="mb-2">
                      <span className="font-medium">{idea.titulo}:</span> <span className="text-sm">Solicitar feedback para esta idea.</span>
                    </li>
                    
                  ))}
                </ul>
              )}
            </div>
              <select name="ideas" id="ideas" value={selectedIdeaId} onChange={(e) => setSelectedIdeaId(e.target.value)} className="mt-4 p-2 border border-gray-300 rounded text-gray-900">
                <option value="" disabled>Selecciona una idea</option>
                {ideas
                    .filter(idea => !idea.aiFeedback)
                    .map(idea => (
                    <option key={idea._id} value={idea._id}>
                        {idea.titulo}
                    </option>
                    ))
                }
               </select>
               {selectedIdeaId && (() => {
                const ideaSeleccionada = ideas.find(i => i._id === selectedIdeaId);
                if (!ideaSeleccionada) return null;
                return (
                    <div className="mt-4 p-4 border border-indigo-300 rounded bg-indigo-50">
                    <h4 className="font-semibold text-indigo-800">{ideaSeleccionada.titulo}</h4>
                    <p className="text-sm text-gray-700">{ideaSeleccionada.descripcion}</p>
                    {selectedIdeaId && (
                        <button
                            onClick={() => solicitarFeedbackIA(selectedIdeaId)}
                            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700 transition duration-200"
                            disabled={isLoadingFeedback}
                        >
                            {isLoadingFeedback ? "Generando feedback..." : "Solicitar Feedback IA"}
                        </button>
                    )}
                    </div>
                );
               })()}
                {selectedIdeaId && (() => {
                    const idea = ideas.find(i => i._id === selectedIdeaId);
                    if (idea?.aiFeedback) {
                        return (
                        <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded">
                            <h4 className="font-semibold text-indigo-700 text-sm mb-2">🧠 Feedback de IA:</h4>
                            <div className="prose prose-indigo max-w-none text-sm text-indigo-800">
                                <ReactMarkdown>
                                    {idea.aiFeedback}
                                </ReactMarkdown>
                            </div>

                        </div>
                        );
                    }
                    return null;
                })()}
          </div>
    )
}