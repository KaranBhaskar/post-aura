import React from "react";
import { Camera, Image } from "lucide-react";
import ToggleSwitch from "../components/ToggleSwitch";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const style = [
  "Realistic",
  "Cartoon",
  "Abstract",
  "Surreal",
  "Minimalist",
  "Vintage",
  "Pop Art",
  "Fantasy",
];

const ImageGenerator = () => {
  const [selectedStyle, setSelectedStyle] = React.useState(style[0]);
  const { getToken } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const axiosPromise = axios.post(
      "/ai/image-generator",
      {
        prompt: e.target.image_prompt.value,
        style: selectedStyle,
        is_public: share,
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
        loading: "Generating image...🕰️",
        success: "Image generated successfully!🎉",
        error: "Failed to generate image.😬",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );

    try {
      const { data } = await axiosPromise;
      // Handle the generated image data
      setGeneratedImages(data.image);
    } catch (err) {
      console.error(
        "Error generating image @ ImageGenerator:",
        err.response.data.message
      );
    }
  };
  const [share, setShare] = React.useState(false);
  const [generatedImages, setGeneratedImages] = React.useState("");
  return (
    <div className="flex h-full p-6 gap-6 lg:flex-row flex-col w-full">
      {/* Left Side - Image Generator */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md shadow-primary/10 w-full max-h-fit"
      >
        <div className="text-2xl font-semibold text-slate flex items-center gap-2 bg-white">
          <Camera className="text-primary" />
          <h2>Image Generator</h2>
        </div>
        <p className=" text-l font-semibold tracking-wide text-slate-700">
          Describe Your Image
        </p>
        <textarea
          name="image_prompt"
          required
          placeholder="Describe the image you want to generate"
          rows={4}
          className="border resize-none border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        ></textarea>
        <p className=" text-l font-semibold tracking-wide text-slate-700">
          Style
        </p>
        <div className="flex flex-wrap gap-2">
          {style.map((styleOption) => (
            <span
              key={styleOption}
              onClick={() => setSelectedStyle(styleOption)}
              className={`cursor-pointer px-3 py-1 rounded-full
                hover:bg-yellow-500 hover:text-white transition
                ${
                  selectedStyle === styleOption
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
            >
              {styleOption}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-4 items-center">
          <ToggleSwitch isOn={share} handleToggle={() => setShare(!share)} />
          <p className="text-sm">Make this image Public</p>
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-yellow/70 transition duration-300 ease-in-out "
        >
          <Camera className="inline w-5 h-5 mr-2" />
          Generate Image
        </button>
      </form>

      {/* Right Side - Generated Images */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md shadow-primary/10 w-full max-h-[600px] min-h-96 overflow-y-auto">
        <div className="flex items-center gap-2">
          <Image className="text-primary" />
          <h2 className="text-xl font-semibold text-slate-700">
            Generated Images
          </h2>
        </div>
        {generatedImages ? (
          <img
            src={generatedImages}
            alt="Generated Image"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        ) : (
          <div className="flex-1 flex justify-center items-center h-full">
            {/* Generated images will be displayed here */}
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-9 h-9" />
              <p>
                Describe an image and click "Generate Image" to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
