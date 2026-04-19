import MongoStore from "connect-mongo";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";

import express from "express";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

import connectDB from "./src/utils/connectDB.js";
import authRoutes from "./src/routes/auth.js";
import "./src/config/passport.js"; // Passport config

import playlistRoutes from "./src/routes/playlist.js";
import feedRoutes from "./src/routes/feed.js";

import videosRouter from "./src/routes/playerControl/transcript.js";
import aiRoutes from "./src/routes/aiRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const cookieSameSite = isProduction ? "none" : "lax";
const PORT = Number(process.env.PORT) || 4000;
const trustProxyRaw = process.env.TRUST_PROXY;
const trustProxyHops =
  trustProxyRaw !== undefined && trustProxyRaw !== ""
    ? Number(trustProxyRaw)
    : isProduction
      ? 1
      : 0;

if (!Number.isInteger(trustProxyHops) || trustProxyHops < 0) {
  throw new Error("TRUST_PROXY must be a non-negative integer (0, 1, 2, ...).");
}
const clientOriginRegexPattern = process.env.CLIENT_ORIGIN_REGEX || "";
let clientOriginRegex = null;

if (clientOriginRegexPattern) {
  try {
    clientOriginRegex = new RegExp(clientOriginRegexPattern);
  } catch {
    throw new Error("CLIENT_ORIGIN_REGEX is not a valid regular expression.");
  }
}

const clientOrigins = (
  process.env.CLIENT_ORIGINS || process.env.CLIENT_URL || ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!isProduction && clientOrigins.length === 0) {
  clientOrigins.push("http://localhost:5173");
}

if (clientOrigins.length === 0) {
  throw new Error(
    "Missing CLIENT_URL or CLIENT_ORIGINS. Configure at least one allowed frontend origin."
  );
}

if (!process.env.MONGO_URI) {
  throw new Error("Missing MONGO_URI. Database connection string is required.");
}

if (!process.env.SESSION_SECRET) {
  throw new Error("Missing SESSION_SECRET. Session signing key is required.");
}

if (isProduction && process.env.SESSION_SECRET.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters in production.");
}

if (isProduction) {
  const urlVars = ["CLIENT_URL", "SERVER_URL"];
  for (const varName of urlVars) {
    const value = process.env[varName];
    if (value && !value.startsWith("https://")) {
      console.warn(`${varName} should use https:// in production. Current value: ${value}`);
    }
  }
}

// ✅ Connect to MongoDB
connectDB();

// Middleware
app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);
app.use(hpp());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || clientOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (clientOriginRegex && clientOriginRegex.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin denied"), false);
    },
    credentials: true,
  })
);

const getRateLimitKey = (req) => {
  const candidateIp =
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress;

  if (candidateIp) {
    return candidateIp;
  }

  // Last-resort key for malformed/aborted requests with no IP details.
  return `unknown:${req.headers["user-agent"] || "na"}`;
};

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 80 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getRateLimitKey,
  message: {
    success: false,
    message: "Too many auth requests. Try again later.",
  },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 600 : 2000,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getRateLimitKey,
  message: {
    success: false,
    message: "Too many requests. Please retry in a while.",
  },
});

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.set("trust proxy", trustProxyHops);

// Session setup
app.use(
  session({
    name: "connect.sid", // Explicitly set cookie name
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for secure cookies behind a proxy (like Render/Netlify)
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: cookieSameSite,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authLimiter);
app.use("/auth", authRoutes);
app.use("/api", apiLimiter);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Study Sphere server is running...");
});

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "development" });
});

// PlAYLIST routes

app.use("/api/playlists", playlistRoutes);

// Feed route
app.use("/api/feed", feedRoutes);

// Player Contorls
app.use("/api/videos", videosRouter);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  if (err?.message === "CORS origin denied") {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  console.error("Unhandled server error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Optional protected test route
app.get("/private", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, message: "This is a protected route" });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// Start server
const currentFilePath = fileURLToPath(import.meta.url);
const executedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (currentFilePath === executedFilePath) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;
