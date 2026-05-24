import mongoose from "mongoose";

const siteStatsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "global",
    },
    totalVisits: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SiteStats = mongoose.model("SiteStats", siteStatsSchema);

export default SiteStats;
