import React from "react";
import "./Layout.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
