import React from "react";
import { LuLogOut } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="top-0 flex flex-col md:flex-row items-center justify-between bg-gray-700  text-white p-3 rounded-lg mb-4">
      {/* Search Input */}
      <div className="hidden md:flex items-center w-full md:w-2/3 mb-3 md:mb-0 bg-gray-100  p-2 rounded-lg">
        <input
          type="text"
          placeholder="Type to Search..."
          className="w-full mr-5 p-1 rounded-lg bg-transparent text-gray-800 outline-none"
        />
        <FaSearch className="text-gray-500 text-lg cursor-pointer mr-6" />
      </div>

      {/* Logout Button */}
      <div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300">
          <div className="flex items-center gap-2">
            <LuLogOut /> <span className="hidden md:inline">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
