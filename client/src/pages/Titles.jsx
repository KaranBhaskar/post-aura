import React from "react";
import { Sparkles, Hash } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const categories = [
  "Technology",
  "Health",
  "Finance",
  "Education",
  "Entertainment",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Sports",
];

const Titles = () => {
  const { getToken } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const axiosPromise = axios.post(
      "/ai/title-generator",
      {
        topic: e.target.title_prompt.value,
        category: button,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    toast.promise(
      axiosPromise,
      {
        loading: "Generating title...🕰️",
        success: "Title generated successfully!🎉",
        error: "Failed to generate title.😬",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
    try {
      const { data } = await axiosPromise;
      setContent(data.title);
      // Handle the generated title (data.title)
    } catch (err) {
      console.error("Error generating title @ Titles:", err);
    }
  };
  const [content, setContent] = React.useState("");
  const [button, setButton] = React.useState("Technology");
  return (
    <div className="flex p-6 gap-6 h-full lg:flex-row flex-col">
      {/* Left Side - Title Generator */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md shadow-primary/10 w-full max-h-fit"
      >
        <div className="text-2xl font-semibold text-slate flex items-center gap-2 bg-white">
          <Sparkles className="text-primary" />
          <h2>Title Generator</h2>
        </div>
        <p className=" text-l font-semibold tracking-wide text-slate-700">
          Keyword
        </p>
        <input
          type="text"
          name="title_prompt"
          required
          placeholder="The future of artificial intelligence"
          className="border border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className=" text-l font-semibold tracking-wide text-slate-700">
          Category
        </p>
        {/* Category Selection - Optional */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              onClick={() => setButton(category)}
              className={`cursor-pointer px-3 py-1 rounded-full
                hover:bg-yellow-500 hover:text-white transition
                ${
                  button === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {category}
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-yellow/70 transition duration-300 ease-in-out "
        >
          <Hash className="inline w-5 h-5 mr-2" />
          Generate Titles
        </button>
      </form>

      {/* Right Side - Generated Titles */}
      <div className="gap-2 flex-1 bg-white p-6 rounded-lg shadow-md shadow-primary/10 w-full max-h-[600px] min-h-96 overflow-y-auto">
        <div className="flex items-center gap-2">
          <Hash className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-slate-700">
            Generated Titles
          </h2>
        </div>
        {/* Generated titles will be displayed here */}
        {content ? (
          <div className="whitespace-pre-wrap mt-4 text-slate-700">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-center">
            <div className="flex flex-col justify-center items-center gap-4 text-slate-500">
              <Hash className="w-8 h-8" />
              <p>Enter Keywords and click "Generate Titles" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Titles;
