import { db } from "../db/connect.js";
import { Tables } from "../db/schema.ts";
import { eq, desc } from "drizzle-orm";
import { getCloudinaryUrl } from "../utils/getImage.js";

export const userDashboard = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan.split("_").join(" "); // Extract plan name before underscore
    let userData = await db
      .select()
      .from(Tables)
      .where(eq(Tables.user_id, userId))
      .orderBy(desc(Tables.created_at));

    userData = userData.map((item) => {
      if (
        item.type.split("-")[0] === "image" ||
        item.type.split("-")[0] === "object" ||
        item.type.split("-")[0] === "background"
      ) {
        return {
          ...item,
          content: getCloudinaryUrl(item.content),
        };
      } else {
        return item;
      }
    });
    res.status(200).json({ creations: userData, plan: plan });
  } catch (error) {
    console.error("Error fetching user dashboard data:", error);
    res.status(500).json({ message: "Internal server error @ userDashboard" });
  }
};

export const userCommunityDashboard = async (req, res) => {
  try {
    let communityData = await db
      .select()
      .from(Tables)
      .where(eq(Tables.public, true))
      .orderBy(desc(Tables.created_at))
      .limit(50);

    communityData = communityData.map((item) => {
      if (
        item.type.split("-")[0] === "image" ||
        item.type.split("-")[0] === "object" ||
        item.type.split("-")[0] === "background"
      ) {
        return {
          ...item,
          content: getCloudinaryUrl(item.content),
        };
      } else {
        return item;
      }
    });
    res.status(200).json({ data: communityData });
  } catch (error) {
    console.error("Error fetching community dashboard data:", error);
    res
      .status(500)
      .json({ message: "Internal server error @ userCommunityDashboard" });
  }
};

export const updateLike = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { creation } = req.body;

    // Updating in the database to add/remove like
    const result = await db
      .update(Tables)
      .set({
        likes: creation.likes,
      })
      .where(eq(Tables.id, creation.id))
      .returning();

    res.status(200).json({ message: "Like status updated", data: result[0] });
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Internal server error @ updateLike" });
  }
};
