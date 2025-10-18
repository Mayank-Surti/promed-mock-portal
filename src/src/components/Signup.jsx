import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Component for user registration with form validation and automatic login after signup
export default function Signup({ setAuth }) {

  // State for form fields and validation errors
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with validations
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (existingUsers.some(user => user.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    // Add new user
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password // for testing purposes only
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Auto login after signup
    setAuth(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify({
      fullName: newUser.fullName,
      email: newUser.email
    }));

    navigate('/portal');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid grid-cols-1 justify-items-center max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg"
    >
  <h2 className="text-3xl font-semibold mb-2">Create your account</h2>
  <h3 className="text-lg text-gray-600 mb-2">Enter your details to register</h3>

      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full mt-6">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-5 p-3 border border-gray-300 placeholder-gray-400 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-5 p-3 border border-gray-300 placeholder-gray-400 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-5 p-3 border border-gray-300 placeholder-gray-400 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 shadow-xl font-bold cursor-pointer"
        >
          SIGN UP
        </button>
      </form>
  </motion.div>
  );
}
