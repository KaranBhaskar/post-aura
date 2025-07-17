import React from "react";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

const CreationItem = ({ creation }) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 flex flex-col cursor-pointer hover:bg-yellow/10 border-rounded-lg border border-primary/30 bg-white shadow-md shadow-primary/10 rounded-lg"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{creation.prompt}</h2>
          <p className="text-sm text-slate-500">
            {creation.type} -{" "}
            {new Date(creation.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => navigate(`/ai/${creation.type}-generator`)}
          className="bg-sb border border-primary text-white px-4 py-2 rounded-full cursor-pointer hover:bg-primary/80 transition"
        >
          {creation.type}
        </button>
      </div>
      {expanded &&
        (creation.type === "image" ? (
          <img
            src={creation.content}
            alt={creation.prompt}
            className="mt-3 w-full max-w-md"
          />
        ) : (
          <div className="mt-4 p-4 bg-bsb rounded-lg ">
            <div className="revert-tw">
              <Markdown>{creation.content}</Markdown>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CreationItem;
