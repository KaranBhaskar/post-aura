import { Edit, Pencil, Sparkles } from "lucide-react";
import React from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ArticleGenerator = () => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const request = {
      prompt: e.target.article_prompt.value,
      length: e.target.article_length.value,
    };

    const axiosPromise = axios.post("/ai/article-generator", request, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    toast.promise(
      axiosPromise,
      {
        loading: "Generating article...",
        success: "Article generated successfully! 🎉",
        error: "Failed to generate article",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );

    try {
      setLoading(true);
      const { data } = await axiosPromise;
      console.log("Article generation result:", data);
      setContent(data.article);
    } catch (err) {
      console.error("Error generating article @ ArticleGenerator:", err);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState("");

  const { getToken } = useAuth();
  return (
    <div className="flex p-6 gap-6 overflow-y-scroll lg:flex-row flex-col">
      toast
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="flex-1 max-h-fit flex flex-col gap-2 bg-white p-6 rounded-lg shadow-md shadow-primary/10 w-full"
      >
        <div className="text-2xl font-semibold text-slate flex items-center gap-2">
          <Sparkles className="text-primary" />
          <h2>Article Generator</h2>
        </div>
        <p className=" text-l font-semibold tracking-wide text-slate-700">
          Article Topic
        </p>
        <input
          type="text"
          name="article_prompt"
          required
          placeholder="The future of artificial intelligence"
          className="border border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className=" text-l font-semibold tracking-wide text-slate-700">
          Article Length
        </p>
        <div>
          <select
            name="article_length"
            className="w-full border border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            defaultValue="300-500"
          >
            <option value="300-500">Short (300-500 words)</option>
            <option value="500-1000">Medium (500-1000 words)</option>
            <option value="1000+">Long (1000+ words)</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-yellow/70 transition duration-300 ease-in-out "
        >
          <Pencil className="inline w-5 h-5 mr-2" />
          Generate Article
        </button>
      </form>
      {/* rightcolumn */}
      <div className="gap-2 flex-1 bg-white p-6 rounded-lg shadow-md shadow-primary/10 w-full max-h-[600px] min-h-96 overflow-y-auto">
        <div className="flex items-center gap-2">
          <Edit className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-slate-700">
            Generated Articles
          </h2>
        </div>
        {content ? (
          <div className="whitespace-pre-wrap mt-4 text-slate-700">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center h-full">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p>Enter a topic and click "Generate Article" to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleGenerator;
