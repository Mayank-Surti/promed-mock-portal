import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Protected component that displays user-specific information and portal features
export default function Portal() {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg"
    >
  <h2 className="text-2xl font-semibold mb-4">
        Welcome, {user?.fullName || 'User'}!
      </h2>
      <div className="mb-6">
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Provider Portal Features</h3>
        <p className="text-gray-700 mb-4">Access patient records, manage appointments, and communicate securely.</p>
        <ul className="list-disc list-inside text-gray-600">
          <li>View and manage patient records</li>
          <li>Schedule and track appointments</li>
          <li>Secure messaging system</li>
          <li>Generate medical reports</li>
        </ul>
      </div>
  </motion.div>
  );
}
