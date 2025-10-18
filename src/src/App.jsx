import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Portal from './components/Portal';
import FloatingImages from './components/FloatingImages';

const App = () => {
  
  // Initialize authentication state from localStorage for persistence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-t from-teal-100 to-teal-500 font-[Nunito] overflow-hidden">
      <FloatingImages />
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setAuth={setIsAuthenticated} />
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setAuth={setIsAuthenticated} />} />
          <Route
            path="/portal"
            element={isAuthenticated ? <Portal /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
