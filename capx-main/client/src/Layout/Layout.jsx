import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-2  md:hidden">
        {/* Menu Button */}
        <button
          className="text-white bg-gray-700 hover:bg-gray-800 w-16 p-2 rounded mr-2"
          onClick={toggleSidebar}
        >
          <HiOutlineMenuAlt1 size={28} />
        </button>

        {/* Logout Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 w-16 ml-2">
          <div className="flex items-center gap-2 justify-center">
            <LuLogOut size={28} />{" "}
            <span className="hidden md:inline">Logout</span>
          </div>
        </button>
      </div>
      <section className="flex flex-1 w-full">
        <div>
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } md:block fixed md:w-[300px] bg-gray-950 py-6 px-5 z-50 w-64 h-full top-0 left-0`}
          >
            <Sidebar closeSidebar={toggleSidebar} />
          </div>
        </div>

        <main className="flex-1 md:ml-[320px] w-full">
          <div className="mt-5 md:ml-0 hidden md:block">
            <Header />
          </div>
          <Outlet />
          <Footer />
        </main>
      </section>
    </div>
  );
};

export default Layout;
