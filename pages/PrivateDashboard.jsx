import { useState, type FormEvent } from 'react';

type Page = 'inicio' | 'misIdeas' | 'nuevaIdea' | 'feedbackIA' | 'configuracion' | 'estadisticas';

interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  aiFeedback?: string;
}

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<Page>('inicio');
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      title: 'Plataforma de aprendizaje gamificada',
      description: 'Una plataforma interactiva para aprender programación con desafíos y recompensas.',
      createdAt: '2023-10-26',
      aiFeedback: 'Excelente idea, el enfoque gamificado puede aumentar la retención de usuarios. Considerar integración con APIs de terceros para contenido educativo.',
    },
    {
      id: '2',
      title: 'App de gestión de tareas con IA',
      description: 'Una aplicación que organiza tus tareas y sugiere prioridades usando inteligencia artificial.',
      createdAt: '2023-10-25',
      aiFeedback: 'Buena propuesta, la IA para priorización es un diferenciador clave. Asegurarse de que la IA sea personalizable y no intrusiva.',
    },
  ]);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDescription, setNewIdeaDescription] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewIdeaSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newIdeaTitle.trim() && newIdeaDescription.trim()) {
      const newIdea: Idea = {
        id: String(Date.now()),
        title: newIdeaTitle.trim(),
        description: newIdeaDescription.trim(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
      setNewIdeaTitle('');
      setNewIdeaDescription('');
      setActivePage('misIdeas'); // Navigate to ideas list after submission
    }
  };

  const renderMainContent = () => {
    switch (activePage) {
      case 'inicio':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Bienvenido a tu Gestor de Ideas!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Aquí puedes organizar, desarrollar y obtener feedback sobre tus ideas más innovadoras.
            </p>
            <button
              onClick={() => setActivePage('nuevaIdea')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
            >
              Subir Nueva Idea
            </button>
            <button
              onClick={() => setActivePage('misIdeas')}
              className="ml-4 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200"
            >
              Ver Mis Ideas
            </button>
          </div>
        );
      case 'misIdeas':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Mis Ideas</h2>
            {ideas.length === 0 ? (
              <p className="text-gray-600">Aún no tienes ideas. ¡Anímate a subir una!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea) => (
                  <div key={idea.id} className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-2">{idea.title}</h3>
                    <p className="text-gray-700 text-sm mb-3">{idea.description}</p>
                    <p className="text-gray-500 text-xs mb-4">Creada el: {idea.createdAt}</p>
                    {idea.aiFeedback && (
                      <div className="mt-4 p-3 bg-indigo-100 rounded-md border border-indigo-200">
                        <h4 className="font-medium text-indigo-700 text-sm mb-1">Feedback de IA:</h4>
                        <p className="text-indigo-600 text-sm italic">{idea.aiFeedback}</p>
                      </div>
                    )}
                    {!idea.aiFeedback && (
                      <button
                        onClick={() => alert('Simulando solicitud de feedback de IA para: ' + idea.title)}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600 transition duration-200"
                      >
                        Solicitar Feedback IA
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'nuevaIdea':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Subir Nueva Idea</h2>
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
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ej. App de gestión de proyectos"
                  required
                />
              </div>
              <div>
                <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción Detallada
                </label>
                <textarea
                  id="ideaDescription"
                  rows={5}
                  value={newIdeaDescription}
                  onChange={(e) => setNewIdeaDescription(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe tu idea, sus funcionalidades principales y el problema que resuelve."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                Guardar Idea
              </button>
            </form>
          </div>
        );
      case 'feedbackIA':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Feedback de IA</h2>
            <p className="text-gray-600">Aquí se mostrará el feedback detallado de la IA para tus ideas.</p>
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Ideas con Feedback Pendiente</h3>
              {ideas.filter(idea => !idea.aiFeedback).length === 0 ? (
                <p className="text-gray-600 text-sm">Todas tus ideas tienen feedback o no hay ideas.</p>
              ) : (
                <ul className="list-disc pl-5 text-gray-700">
                  {ideas.filter(idea => !idea.aiFeedback).map(idea => (
                    <li key={idea.id} className="mb-2">
                      <span className="font-medium">{idea.title}:</span> <span className="text-sm">Solicitar feedback para esta idea.</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      case 'configuracion':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h2>
            <p className="text-gray-600">Gestiona tus preferencias de usuario y ajustes de la aplicación aquí.</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-700 font-medium">Notificaciones por correo</span>
                <label htmlFor="toggle-notifications" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id="toggle-notifications" className="sr-only" />
                    <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-700 font-medium">Modo Oscuro</span>
                <label htmlFor="toggle-darkmode" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id="toggle-darkmode" className="sr-only" />
                    <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );
      case 'estadisticas':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Estadísticas</h2>
            <p className="text-gray-600">Aquí podrás ver gráficos y métricas sobre tus ideas y su progreso.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Ideas Totales</h3>
                <p className="text-5xl font-bold text-indigo-600">{ideas.length}</p>
              </div>
              <div className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Ideas con Feedback IA</h3>
                <p className="text-5xl font-bold text-indigo-600">{ideas.filter(idea => idea.aiFeedback).length}</p>
              </div>
              <div className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Ideas Pendientes de Feedback</h3>
                <p className="text-5xl font-bold text-indigo-600">{ideas.filter(idea => !idea.aiFeedback).length}</p>
              </div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl p-5 flex items-center justify-center text-gray-500">
                Gráfico de Tendencias (Placeholder)
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { name: 'Inicio', page: 'inicio' as Page, icon: '🏠' },
    { name: 'Mis Ideas', page: 'misIdeas' as Page, icon: '💡' },
    { name: 'Subir Idea', page: 'nuevaIdea' as Page, icon: '➕' },
    { name: 'Feedback IA', page: 'feedbackIA' as Page, icon: '🤖' },
    { name: 'Estadísticas', page: 'estadisticas' as Page, icon: '📊' },
    { name: 'Configuración', page: 'configuracion' as Page, icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-indigo-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex-shrink-0 shadow-lg`}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-indigo-700">
          {isSidebarOpen && <h1 className="text-2xl font-bold text-white">IdeaFlow</h1>}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActivePage(item.page)}
                  className={`flex items-center w-full py-3 px-4 text-left text-lg font-medium rounded-md transition duration-200
                    ${activePage === item.page ? 'bg-indigo-700 text-white shadow-inner' : 'hover:bg-indigo-700 hover:text-white'}
                  `}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between h-16 sticky top-0 z-10">
          <div className="flex items-center">
            <div className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
              IF
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            {/* User Name/Avatar (Optional with Clerk) */}
            <div className="flex items-center">
              <span className="text-gray-700 font-medium mr-2">John Doe</span>
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center text-gray-500 text-sm">
                JD
              </div>
            </div>
            {/* SignOutButton */}
            <button
              onClick={() => alert('Cerrar sesión')}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Dynamic Main Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Home;
