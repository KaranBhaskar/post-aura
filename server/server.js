import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { aiRouter } from "./routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//Checking if the user is logged in for all routes below
app.use(requireAuth());
app.use("/ai", aiRouter);

export { app };
