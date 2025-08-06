import { v2 as cloudinary } from "cloudinary";
import { connectCloudinary } from "../configs/cloudinary.js";

export const uploadBufferImage = async (
  buffer,
  folder = "generated_images"
) => {
  try {
    // Ensure Cloudinary is configured
    connectCloudinary();

    // Upload the image buffer to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          public_id: `img_${Date.now()}`,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    return {
      public_id: uploadResponse.public_id,
      url: uploadResponse.secure_url,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
