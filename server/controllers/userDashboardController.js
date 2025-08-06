import { db } from "../db/connect.js";
import { Tables } from "../db/schema.ts";
import { eq, desc } from "drizzle-orm";

export const userDashboard = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;

    const userData = await db
      .select()
      .from(Tables)
      .where(eq(Tables.user_id, userId))
      .orderBy(desc(Tables.created_at));

    res.status(200).json({ data: userData, plan: plan });
  } catch (error) {
    console.error("Error fetching user dashboard data:", error);
    res.status(500).json({ message: "Internal server error @ userDashboard" });
  }
};

export const userCommunityDashboard = async (req, res) => {
  try {
    const communityData = await db
      .select()
      .from(Tables)
      .where(eq(Tables.public, true))
      .orderBy(desc(Tables.created_at))
      .limit(50);

    res.status(200).json({ data: communityData });
  } catch (error) {
    console.error("Error fetching community dashboard data:", error);
    res
      .status(500)
      .json({ message: "Internal server error @ userCommunityDashboard" });
  }
};
