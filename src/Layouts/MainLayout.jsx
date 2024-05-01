import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import BreadCrumps from "../Components/BreadCrumps";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-5">
        <BreadCrumps />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
