import express from "express";
import { auth } from "../middleware/auth.js";
import { generateArticle } from "../controllers/blogGenerator.js";
import { generateTitle } from "../controllers/titleController.js";
import { generateImage } from "../controllers/ImageGenerator.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-title", auth, generateTitle);
aiRouter.post("/generate-image", auth, generateImage);

export { aiRouter };
