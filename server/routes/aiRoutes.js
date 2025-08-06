import express from "express";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { generateArticle } from "../controllers/blogGeneratorController.js";
import { generateTitle } from "../controllers/titleController.js";
import { generateImage } from "../controllers/imageGeneratorController.js";
import { removeBackground } from "../controllers/removeBackgroundController.js";
import { objectRemover } from "../controllers/objectRemoverController.js";
import { resumeHelper } from "../controllers/resumeHelperController.js";
import {
  userDashboard,
  userCommunityDashboard,
} from "../controllers/userDashboardController.js";

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
aiRouter.get("/", auth, userDashboard);
aiRouter.get("/", auth, userDashboard);
aiRouter.get("/community", auth, userCommunityDashboard);

export { aiRouter };
