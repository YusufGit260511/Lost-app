import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex fixed w-full justify-between items-center py-4 px-8 shadow-sm bg-white">
      {/* Лого */}
      <div className="flex items-center space-x-2">
        <span className="text-blue-600 font-bold text-xl">ELIF</span>
        <span className="text-gray-500 text-sm">Even Lost, | Found</span>
      </div>

      {/* Навигация */}
      <div className="flex items-center space-x-6 text-gray-600 font-medium">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/claim" className="hover:text-blue-600">
          Lost Items
        </Link>
        <Link to="/claim" className="hover:text-blue-600">
          Found Items
        </Link>
        <Link to="/report" className="hover:text-blue-600">
          Report Item
        </Link>
        <Link to="/profile" className="hover:text-blue-600">
          Profile
        </Link>
        <Link to="/posts" className="hover:text-blue-600">  
          Posts 
        </Link>
      </div>

      {/* Кнопки */}
      <div className="flex items-center space-x-3">
        <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
          Log in
        </Link>
        <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
