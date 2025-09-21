import React from "react";
import { Plus, Search, Shield } from "lucide-react"; // иконки

const Header = () => {
  return (
    <header className="text-center py-16 px-6 bg-white mt-[50px]">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Even Lost, I Found
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto mb-8">
        The community platform that connects people who have lost items
        with those who have found them.
      </p>

      {/* Кнопки */}
      <div className="flex justify-center space-x-4 mb-12">
        <button className="flex items-center space-x-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
          <Plus size={18} />
          <span>Report an Item</span>
        </button>
        <button className="flex items-center space-x-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer">
          <Search size={18} />
          <span>Search Lost Items</span>
        </button>
      </div>

      {/* Три карточки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-[140px]">
        <div className="bg-[#F5EDED] rounded-xl p-6 py-[44px] shadow-sm hover:shadow-md h-[268px] flex flex-col items-center justify-between cursor-pointer">
          <Plus className="w-8 h-8 mb-4 text-gray-700" />
          <h3 className="font-semibold text-lg">Report Lost Items</h3>
          <p className="text-gray-500 text-sm mt-2">
            Quickly report your lost items with details and images to
            increase your chances of finding them.
          </p>
        </div>

        <div className="bg-[#F5EDED] rounded-xl p-6 py-[44px] shadow-sm hover:shadow-md h-[268px] flex flex-col items-center justify-between cursor-pointer">
          <Search className="w-8 h-8 mb-4 text-gray-700" />
          <h3 className="font-semibold text-lg">Find Items</h3>
          <p className="text-gray-500 text-sm mt-2">
            Search for items by category, location, and date.
          </p>
        </div>

        <div className="bg-[#F5EDED] rounded-xl p-6 py-[44px] shadow-sm hover:shadow-md h-[268px] flex flex-col items-center justify-between cursor-pointer">
          <Shield className="w-8 h-8 mb-4 text-gray-700" />
          <h3 className="font-semibold text-lg">Verification System</h3>
          <p className="text-gray-500 text-sm mt-2">
            Ensures that items are returned to their rightful owners.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
