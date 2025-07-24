import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-screen w-full items-center justify-flex-start overflow-hidden px-4 py-4 sm:px-20 xl:px-32">
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
    select-none text-[22vw] font-black leading-none text-db opacity-30"
      >
        AURO
      </span>

      <div className="flex-col justify-between z-10  w-3/4">
        <div className="text-sb font-light text-2xl py-5 px-20 max-sm:text-sm max-sm:px-5">
          {" "}
          <span>
            50+ Viral Templates <br /> and 24/7 Support
          </span>
        </div>
        <h1
          className="text-4xl text-white tracking-wide
     font-light underline leading-10 decoration-bl decoration-5 underline-offset-8 max-sm:text-lg max-sm:decoration-2 max-sm:leading-5"
        >
          Don't just post, perform. leverage AI to craft stories that captivate
          your industry, and open doors to new opportunities.
        </h1>
        <div className="text-yellow py-10 text-xl opacity-70 px-20 max-sm:text-base max-sm:px-5">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </div>
        <button
          onClick={() => navigate("/ai")}
          className="bg-sb text-black font-medium 
    px-8 py-3 rounded-md w-fit text-lg font-extralight mx-20 cursor-pointer
    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:brightness-110
    max-sm:mx-5 max-sm:px-6 max-sm:py-2 max-sm:text-base"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
