import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Component for user authentication using stored credentials
export default function Login({ setAuth }) {

  // State for form fields and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setAuth(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        fullName: user.fullName,
        email: user.email
      }));
      navigate('/portal');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid grid-cols-1 justify-items-center max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg"
    >
  <h2 className="text-3xl font-semibold mb-2">Welcome back!</h2>
  <h3 className="text-lg text-gray-600 mb-2">Sign in to access your portal</h3>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleLogin} className='mt-6'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-5 p-3 border border-gray-300 placeholder-gray-400 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-3 border border-gray-300 placeholder-gray-400 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 shadow-xl font-bold cursor-pointer"
        >
          LOG IN
        </button>
      </form>
  </motion.div>
  );
}
