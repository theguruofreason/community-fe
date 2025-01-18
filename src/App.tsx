import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './Login'
import './App.css'
import Homepage from './Homepage';

function App() {
  return (
    <div className='App'>
      <nav className='nav'>
        <Link to="/" className='nav-item'>Homepage</Link>
        <Link to="/login" className='nav-item'>Login</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App
