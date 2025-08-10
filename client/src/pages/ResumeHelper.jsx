import React from "react";
import { Sparkles, File, Pencil } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ResumeHelper = () => {
  const { getToken } = useAuth();
  const [content, setContent] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    formData.append("resume", e.target.resume_upload.files[0]);
    formData.append("resumeAdvice", e.target.resume_help.value);

    const axiosPromise = axios.post("/ai/resume-helper", formData, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    toast.promise(axiosPromise, {
      loading: "Generating resume feedback...",
      success: "Resume feedback generated successfully! 🎉",
      error: "Failed to generate resume feedback. 😬",
    });

    try {
      const { data } = await axiosPromise;
      setContent(data.feedback);
    } catch (err) {
      console.error(
        "Error generating resume feedback @ ResumeHelper:",
        err.response.data.message
      );
    }
  };
  return (
    <div className="flex h-full p-6 gap-6 lg:flex-row flex-col w-full overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md shadow-primary/10 min-w-0 max-h-fit"
      >
        <div className="text-2xl font-semibold text-slate-700 flex items-center gap-2 bg-white">
          <Sparkles className="text-primary" />
          <h2>Resume Helper</h2>
        </div>
        <div className="flex flex-col gap-2">
          <p className=" text-l font-semibold tracking-wide text-slate-700">
            Upload Resume
          </p>
          <input
            type="file"
            name="resume_upload"
            accept=".pdf,.doc,.docx"
            required
            className="border border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-gray-500 text-sm">
            Supports PDF, DOC, and DOCX formats
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className=" text-l font-semibold tracking-wide text-slate-700">
            What would you like help with?
          </p>
          <textarea
            name="resume_help"
            id="resume_help"
            required
            placeholder="E.g., Improve wording for my work experience section"
            rows={4}
            className="border resize-none border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          <p className="text-gray-500 text-sm">
            Be as specific as possible for best results.
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-yellow/70 transition duration-300 ease-in-out "
        >
          <File className="inline w-5 h-5 mr-2" />
          Get Resume Help
        </button>
      </form>

      {/* right side  */}
      <div className="flex-1 flex-cols max-h-[600px] bg-white p-6 rounded-lg shadow-md shadow-primary/10 min-w-0">
        {/* Processed resumes will be displayed here */}
        <div className="flex items-center gap-2 mb-4">
          <Pencil className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-slate-700">
            Pointers for your Resumes
          </h2>
        </div>
        {content ? (
          <div className="whitespace-pre-wrap mt-4 text-slate-700">
            <Markdown>{content}</Markdown>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-sm flex flex-col items-center text-center gap-5 text-gray-400">
              <Pencil className="w-9 h-9" />
              <p>
                Upload your resume and describe the help you need to get
                started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeHelper;
