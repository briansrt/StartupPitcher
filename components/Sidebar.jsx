import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: '📊', route: '/Dashboard' },
    { name: 'Mis Ideas', icon: '💡', route: '/MisIdeas' },
    { name: 'Subir Idea', icon: '➕', route: '/SubirIdea' },
    { name: 'Feedback Idea', icon: '🤖', route: '/FeedbacksIdeas' },
    { name: 'Pitch', icon: '🎤', route: '/Pitch' },
    { name: 'Ideas Públicas', icon: '💬', route: '/IdeasPublicas' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`bg-indigo-800 text-white sticky top-0 h-screen ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex-shrink-0 shadow-lg`}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-indigo-700">
          {isSidebarOpen && <h1 className="text-2xl font-bold text-white">StartupPitcher</h1>}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.route)}
                  className={`flex items-center w-full py-3 px-4 text-left text-lg font-medium rounded-md transition duration-200
                    ${location.pathname === item.route ? 'bg-indigo-700 text-white shadow-inner' : 'hover:bg-indigo-700 hover:text-white'}
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
    </div>
  );
}
