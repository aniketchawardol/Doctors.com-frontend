import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen animate-appear w-full bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
