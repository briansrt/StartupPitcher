import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import './App.css'
import PublicDashboard from '../pages/PublicDashboard'
import RequireAuth from '../components/RequireAuth';
import MisIdeas from '../pages/MisIdeas';
import SubirIdea from '../pages/SubirIdea';
import FeedbackIdeas from '../pages/FeedbackIdeas';
import MainLayout from '../components/MainLayout';
import Pitch from '../pages/Pitch'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetalleIdea from '../components/DetalleIdea';
import Dashboard from '../pages/Dashboard';
import IdeasPublicas from '../pages/IdeasPublicas';

function App() {

  return (
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<PublicDashboard />}></Route>
        <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/MisIdeas" element={<MisIdeas />} />
          <Route path="/MisIdeas/:id" element={<DetalleIdea />} />
          <Route path="/SubirIdea" element={<SubirIdea />} />
          <Route path="/IdeasPublicas" element={<IdeasPublicas />} />
          <Route path="/FeedbacksIdeas" element={<FeedbackIdeas />} />
          <Route path="/Pitch" element={<Pitch />} />
        </Route>
      </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </BrowserRouter>
  )
}

export default App
