// MainLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className='flex-1 overflow-y-auto bg-gray-50'><Outlet /></main>
      </div>
    </div>
  );
};

export default MainLayout;

