import express from "express";
import { generateArticle } from "../controllers/blogGenerator.js";
import { generateTitle } from "../controllers/titleController.js";
import { auth } from "../middleware/auth.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-title", auth, generateTitle);

export { aiRouter };
