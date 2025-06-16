import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className="min-h-screen animate-appear w-full bg-gradient-to-tr from-white from-40% via-amber-100 to-teal-100">
          <Outlet />
        <Footer className="block"/>
      </div>
    </>
  );
}

export default Layout;
