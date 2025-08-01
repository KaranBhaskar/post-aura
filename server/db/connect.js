import { drizzle } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
