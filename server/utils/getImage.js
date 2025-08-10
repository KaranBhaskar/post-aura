import { v2 as cloudinary } from "cloudinary";
import { connectCloudinary } from "../configs/cloudinary.js";

export const getCloudinaryUrl = (public_id) => {
  connectCloudinary();
  return cloudinary.url(public_id, {
    crop: "auto",
    gravity: "auto",
    quality: "auto",
    fetch_format: "auto",
  });
};

export default getCloudinaryUrl;
