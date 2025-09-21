import React, { useState } from "react";

const ReportItem = () => {
  const [type, setType] = useState("lost"); // lost | found

  return (
    <div className="flex justify-center py-12 px-4 bg-gray-50 min-h-screen mt-[50px]">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl">
        {/* Заголовок */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report an Item</h2>
        <p className="text-gray-500 mb-6">
          Please provide as much detail as possible to help with identification.
        </p>

        {/* Переключатель Lost / Found */}
        <div className="flex mb-6">
          <button
            onClick={() => setType("lost")}
            className={`flex-1 px-4 py-2 rounded-l-md font-medium cursor-pointer ${
              type === "lost"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            I Lost an Item
          </button>
          <button
            onClick={() => setType("found")}
            className={`flex-1 px-4 py-2 rounded-r-md font-medium cursor-pointer ${
              type === "found"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            I Found an Item
          </button>
        </div>

        {/* Форма */}
        <form className="space-y-5">
          {/* Item Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Item Name*
            </label>
            <input
              type="text"
              placeholder="e.g., Black Nike Backpack"
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category*
            </label>
            <select
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="documents">Documents</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location*
              </label>
              <input
                type="text"
                placeholder="Where was it lost/found?"
                className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date*
              </label>
              <input
                type="date"
                className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description*
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contact Information*
            </label>
            <input
              type="text"
              placeholder="Your email or phone number"
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-5 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItem;
