import React from 'react';
import { motion } from 'framer-motion';
import logo1 from '../assets/stethoscope.png';
import logo2 from '../assets/clipboard.png';

const FloatingImages = () => {
  return (
    <>
      <motion.img
        src={logo2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        whileHover={{ 
          opacity: 0.2,
          transition: { duration: 0.3 }
        }}
        className="fixed top-40 left-20 w-36 h-36 animate-float"
      />
      <motion.img
        src={logo1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        whileHover={{ 
          opacity: 0.2,
          transition: { duration: 0.3 }
        }}
        className="fixed bottom-20 right-20 with-64 h-64 animate-float-delayed"
      />
    </>
  );
};

export default FloatingImages;