import { DrizzleConfig } from "drizzle-orm";
import "dotenv/config";
import { url } from "inspector";


export default defineConfig({
  schema: "./db/schema.ts",
    out: './db/migrations',
    dialect: 'pg',
    dbCredentials: {
        url: process.env.DATABASE_URL,        
    }
});
