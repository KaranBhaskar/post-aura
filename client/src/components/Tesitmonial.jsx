import React from "react";
import { karanData } from "../assets/assets";

const Testimonial = () => {
  const openLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/karanbhaskarr/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      onClick={openLinkedIn}
      onKeyDown={(e) => e.key === "Enter" && openLinkedIn()}
      role="button"
      tabIndex={0}
      className="my-20 max-w-lg w-full mx-auto px-4 sm:px-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <a
            href="https://www.linkedin.com/in/karanbhaskarr/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <img
              src={karanData[0].image}
              alt=""
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
          </a>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <a
                href="https://www.linkedin.com/in/karanbhaskarr/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-900 hover:underline truncate"
              >
                Karan Bhaskar
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/karanbhaskarr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm hover:underline"
            >
              @karanbhaskarr
            </a>
          </div>
        </div>
        <a
          href="https://www.linkedin.com/in/karanbhaskarr/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="shrink-0 text-blue-400 hover:text-blue-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554V14.75c0-1.361-.027-3.115-1.896-3.115-1.896 0-2.188 1.48-2.188 3.009v5.808H9.253V9h3.414v1.561h.048c.476-.9 1.637-1.848 3.37-1.848 3.602 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433A2.062 2.062 0 1 1 5.334 3.31a2.062 2.062 0 0 1 .003 4.123zM6.9 20.452H3.771V9H6.9z" />
          </svg>
        </a>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
          😎 Built my own AI workspace from scratch.
          <br />
          <br />
          ⚡️ Meet Aura: An all-in-one suite for creators.
          <br />
          <br />
          ✅ GPT-4o Article Writer
          <br />
          ✅ Viral Hook Generator
          <br />
          ✅ Custom Image Engine
          <br />
          ✅ Resume Parser
          <br />
          <br />
          ⚛️ Built with React, Tailwind, Express, Postgress and pure caffeine.
          ☕️
          <br />
          <br />I am looking for a Summer 2026 SWE Internship. I don’t just want
          the role, I want to be the best intern you’ve ever hired.
          <br />
          <br />
          DMs open. Let’s work. 👇 #Coding #React #Internship
        </p>
      </div>

      {/* Timestamp */}
      <div className="text-gray-500 text-xs">2:30 PM · Today</div>
    </div>
  );
};

export default Testimonial;
