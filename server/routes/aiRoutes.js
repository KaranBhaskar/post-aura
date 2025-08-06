import express from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { generateArticle } from "../controllers/blogGenerator.js";
import { generateTitle } from "../controllers/titleController.js";
import { generateImage } from "../controllers/imageGenerator.js";
import { removeBackground } from "../controllers/removeBackground.js";
import { objectRemover } from "../controllers/objectRemover.js";
import { resumeHelper } from "../controllers/resumeHelper.js";

const aiRouter = express.Router();

aiRouter.post("/article-generator", auth, generateArticle);
aiRouter.post("/title-generator", auth, generateTitle);
aiRouter.post("/image-generator", auth, generateImage);
aiRouter.post(
  "/remove-background",
  auth,
  upload.single("image"),
  removeBackground
);
aiRouter.post("/remove-object", auth, upload.single("image"), objectRemover);
aiRouter.post("/resume-helper", auth, upload.single("resume"), resumeHelper);

export { aiRouter };
