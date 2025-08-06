import { v2 as cloudinary } from "cloudinary";

const getCloudinaryUrl = (public_id) => {
  connectCloudinary();
  return cloudinary.url(public_id, {
    crop: "auto",
    gravity: "auto",
    quality: "auto",
    fetch_format: "auto",
  });
};

export default getCloudinaryUrl;
