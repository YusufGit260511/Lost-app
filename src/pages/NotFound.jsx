import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <AlertTriangle className="w-20 h-20 text-yellow-500" />
      </motion.div>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-6xl font-extrabold text-gray-800 mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-gray-600 mb-8"
      >
        Упс! Похоже, эта страница потерялась во Вселенной 🌌
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          ⬅️ Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;