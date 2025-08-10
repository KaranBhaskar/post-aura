import React from "react";
import { Eraser, WandSparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const { getToken } = useAuth();
  const [content, setContent] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    formData.append("image", e.target.image_upload.files[0]);
    const axiosPromise = axios.post("/ai/remove-background", formData, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    toast.promise(axiosPromise, {
      loading: "Processing image...",
      success: "Background removed successfully! 🎉",
      error: "Failed to remove background. 😬",
    });

    try {
      const { data } = await axiosPromise;
      setContent(data.image);
    } catch (err) {
      console.error(
        "Error removing background @ RemoveBackground:",
        err.response.data.message
      );
    }
  };
  return (
    <div className="flex h-full p-6 gap-6 lg:flex-row flex-col w-full overflow-y-">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md shadow-primary/10 min-w-0 max-h-fit"
      >
        <div className="text-2xl font-semibold text-slate-700 flex items-center gap-2 bg-white">
          <WandSparkles className="text-[#FF4938]" />
          <h2>Remove Background</h2>
        </div>
        <div className="flex flex-col gap-2">
          <p className=" text-l font-semibold tracking-wide text-slate-700">
            Upload Image
          </p>
          <input
            type="file"
            name="image_upload"
            accept="image/*"
            required
            className="border border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-gray-500 text-sm">
            Supports PNG, JPG, and JPEG formats
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] cursor-pointer text-white font-semibold py-3 rounded-lg hover:from-[#FF4938] hover:to-[#F6AB41]"
        >
          <Eraser className="inline w-5 h-5 mr-2" />
          Remove Background
        </button>
      </form>
      {/* Processed images will be displayed here */}
      <div className="flex-1 flex-cols min-h-[600px] max-h-max bg-white p-6 rounded-lg shadow-md shadow-primary/10 min-w-0">
        <div className="flex items-center gap-2 mb-4">
          <Eraser className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-slate-700">
            Processed Images
          </h2>
        </div>
        {content ? (
          <img
            src={content}
            alt="Processed Image"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-sm flex flex-col items-center text-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>
                Upload an image and click "Remove Background" to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
