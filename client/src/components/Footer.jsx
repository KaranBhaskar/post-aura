import React from "react";

const Footer = () => {
  return (
    <footer className=" my-0 flex flex-col items-center justify-center w-full py-10 px-6 bg-db text-white/80 border-t border-sb/50">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-white">
          Aura
          <span className="text-xl text-yellow"> : AI Workspace</span>
        </div>
      </div>
      <p className="mt-2 text-center text-sm opacity-80">
        Copyright © 2025 Aura. All rights reserved.
      </p>
      <div className="flex items-center gap-4 mt-4">
        <a
          href="https://www.linkedin.com/in/karanbhaskarr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 transition-all duration-300"
          aria-label="LinkedIn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white/80 hover:text-white"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554V14.75c0-1.361-.027-3.115-1.896-3.115-1.896 0-2.188 1.48-2.188 3.009v5.808H9.253V9h3.414v1.561h.048c.476-.9 1.637-1.848 3.37-1.848 3.602 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433A2.062 2.062 0 1 1 5.334 3.31a2.062 2.062 0 0 1 .003 4.123zM6.9 20.452H3.771V9H6.9z" />
          </svg>
        </a>
        <a
          href="https://github.com/karanbhaskar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 transition-all duration-300"
          aria-label="GitHub"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white/80 hover:text-white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.5c-5.523 0-10 4.477-10 10 0 4.418 2.865 8.166 6.839 9.49.5.09.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.37-1.34-3.37-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.936.359.309.679.92.679 1.855 0 1.338-.012 2.418-.012 2.746 0 .268.18.577.688.479A10.004 10.004 0 0 0 22 11.5c0-5.523-4.477-10-10-10Z"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
