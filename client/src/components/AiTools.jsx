import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div className="px-4 sm:px-20 xl:px-32 my-10">
      <div className="text-center ">
        <h2
          className="bg-bl text-white text-4xl font-bold tracking-widest py-3 rounded-3xl 
          shadow-xl shadow-slate-900/50"
        >
          Powerful AI Tools
        </h2>
        <p
          className="my-7 text-white text-xl px-30 font-extralight
            underline leading-10 decoration-sb decoration-2 underline-offset-5
            "
        >
          Everything you need to create, enhance, and optimize your content with
          the latest AI models, fine tuned for your needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-5xl mx-auto justify-items-center">
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className="bg-db hover:bg-sb hover:scale-105
               transition-all duration-300 
              rounded-2xl flex flex-col items-center
               justify-center p-5 cursor-pointer aspect-5/6 max-w-xs
              shadow-lg shadow-slate-900/50"
              onClick={() =>
                user
                  ? navigate(tool.path)
                  : openSignIn({ fallbackRedirectUrl: tool.path })
              }
            >
              <tool.Icon className="w-20 h-20 mb-4 text-yellow" />
              <h3 className="text-white text-2xl font-semibold mb-2">
                {tool.title}
              </h3>
              <p className="text-white text-center font-light">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiTools;
