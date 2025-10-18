import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/promed-logo.png';

// Navigation component that adapts based on authentication state
export default function Navbar({ isAuthenticated, setAuth }) {

  const navigate = useNavigate();

  // Clear auth state and redirect to login
  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="React Logo" className="h-15 w-15" />
        <h1 className="text-3xl font-bold">
          ProMed Health <span className="text-teal-500">Plus</span>
        </h1>
      </div>
      <div className="space-x-4 pr-4 font-bold text-lg">
        {!isAuthenticated ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Register</Link>
          </>
        ) : (
          <>
            <Link to="/portal">Portal</Link>
            <button
              onClick={handleLogout}
              className="bg-white border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-100 cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
