"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`fixed inset-y-0 z-20 transition-transform transform bg-white md:static md:translate-x-0 md:w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <SideBar />
      </div>

      <div className="w-full">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-10">{children}</div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
