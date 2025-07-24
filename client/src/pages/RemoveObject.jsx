import React from "react";
import { Sparkles, Eraser } from "lucide-react";

const RemoveObject = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <div className="flex w-full h-full p-4 gap-6 lg:flex-row flex-col overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md shadow-primary/10 min-w-0 max-h-fit"
      >
        <div className="text-2xl font-semibold text-slate-700 flex items-center gap-2 bg-white">
          <Sparkles className="text-[#FF4938]" />
          <h2>Remove Object</h2>
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
        <div className="flex flex-col gap-2">
          <p className=" text-l font-semibold tracking-wide text-slate-700">
            Describe object to remove
          </p>
          <textarea
            name="remove_object"
            id="remove_object"
            required
            placeholder="E.g., Remove the person on the left side of the image"
            rows={4}
            className="border border-primary/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
          <p className="text-gray-500 text-sm">
            Be as specific as possible for best results.
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] cursor-pointer text-white font-semibold py-3 rounded-lg hover:from-[#FF4938] hover:to-[#F6AB41]"
        >
          <Eraser className="inline w-5 h-5 mr-2" />
          Remove Object
        </button>
      </form>
      <div className="flex-1 flex-cols max-h-[600px] bg-white p-6 rounded-lg shadow-md shadow-primary/10 min-w-0">
        {/* Processed images will be displayed here */}
        <div className="flex items-center gap-2 mb-4">
          <Eraser className="w-6 h-6 text-[#FF4938]" />
          <h2 className="text-xl font-semibold text-slate-700">
            Processed Images
          </h2>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="text-sm flex flex-col items-center text-center gap-5 text-gray-400">
            <Eraser className="w-9 h-9" />
            <p>Upload an image and click "Remove Object" to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
