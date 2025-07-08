import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav
      className="fixed z-15 w-full backdrop-blur-2xl flex justify-between items-center 
    px-4 py-4 sm:px-20 xl:px-32 text-xl border-b-db border-b-2 bg-primary"
    >
      <h1 className="text-yellow font-headline hover:underline text-4xl">
        <Link className="w-32 sm:w-44" to="/">
          Aura
        </Link>
      </h1>

      {user ? (
        <div className="hover:drop-shadow-[0_0_2em_var(--color-yellow)]">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm
        cursor-pointer bg-yellow px-10 py-2.5 hover:bg-yellow-500 "
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};
export default Navbar;
