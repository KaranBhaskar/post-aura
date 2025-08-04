// Middleware to check the userID and hasThePremium
import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();
    const hasPremiumPlan = await has({ plan: "agent_investor" });

    const userData = await clerkClient.users.getUser(userId);
    if (!hasPremiumPlan && userData.privateMetadata.free_usage) {
      req.free_usage = userData.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "agent_investor" : "recruiter";
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error @ auth" });
  }
};
