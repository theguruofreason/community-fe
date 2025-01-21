import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './Login'
import './App.css'
import Homepage from './Homepage';
import LandingPage from './Landing';
import Registration from './Registration';

function App() {
  return (
    <div className='App'>
      <nav className='nav'>
        <Link to="/" className='nav-item'>Main</Link>
        <Link to="/login" className='nav-item'>Login</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  )
}

export default App
