import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-6 px-8 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center bg-white">
      {/* Левая часть */}
      <p>© 2024 ELIF. All rights reserved.</p>

      {/* Правая часть */}
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
        <a href="#" className="hover:text-blue-600">Terms of Service</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
