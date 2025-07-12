import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const { user } = useUser();
  const location = useLocation();
  return user ? (
    <div
      className="flex flex-col h-screen justify-start items-start
    "
    >
      <nav
        className="z-10 px-4 py-4 sm:px-20 xl:px-25 border-b border-b-primary/30 w-screen shadow-md 
      shadow-primary/20 flex justify-between items-center"
      >
        <h1 className="text-primary font-headline text-4xl">
          <Link className="w-32 sm:w-44" to="/">
            Aura
          </Link>
        </h1>
        {sidebar ? (
          <X
            className="w-6 h-6 text-primary sm:hidden"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 text-primary sm:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>
      <div className="flex w-full h-[calc(100vh-72px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-bsb ml-0 sm:ml-64 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen w-screen bg-bsb">
      <SignIn fallbackRedirectUrl={location.pathname} />
    </div>
  );
};

export default Layout;
