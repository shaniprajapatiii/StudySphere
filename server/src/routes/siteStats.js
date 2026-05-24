import express from "express";
import SiteStats from "../models/SiteStats.js";

const router = express.Router();

// GET /api/stats/visits - Read total website visits
router.get("/visits", async (req, res) => {
  try {
    const stats = await SiteStats.findOne({ key: "global" }).lean();
    return res.json({ success: true, totalVisits: stats?.totalVisits || 0 });
  } catch (error) {
    console.error("Get visits error:", error);
    return res.status(500).json({ success: false, message: "Failed to load visit count" });
  }
});

// POST /api/stats/visits - Increment total website visits
router.post("/visits", async (req, res) => {
  try {
    const stats = await SiteStats.findOneAndUpdate(
      { key: "global" },
      {
        $inc: { totalVisits: 1 },
        $setOnInsert: { key: "global" },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    return res.json({ success: true, totalVisits: stats.totalVisits });
  } catch (error) {
    console.error("Increment visits error:", error);
    return res.status(500).json({ success: false, message: "Failed to update visit count" });
  }
});

export default router;
