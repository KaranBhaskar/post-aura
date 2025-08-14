import { app } from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 2025;

// Only start server in local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
