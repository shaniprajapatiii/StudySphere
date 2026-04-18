// server/src/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

const requiredGoogleEnv = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "SERVER_URL",
  "CLIENT_URL",
];
const missingGoogleEnv = requiredGoogleEnv.filter(
  (key) => !process.env[key]
);
const googleAuthEnabled = missingGoogleEnv.length === 0;

// ✅ Safety check for required environment variables
if (!googleAuthEnabled && process.env.NODE_ENV === "production") {
  throw new Error(
    `❌ Missing required Google OAuth environment variables: ${missingGoogleEnv.join(
      ", "
    )}`
  );
}

if (!googleAuthEnabled) {
  console.warn(
    `⚠️ Google OAuth disabled. Missing env vars: ${missingGoogleEnv.join(", ")}`
  );
}

if (process.env.NODE_ENV === "production") {
  if (!process.env.SERVER_URL.startsWith("https://")) {
    throw new Error("❌ SERVER_URL must use https:// in production.");
  }

  if (!process.env.CLIENT_URL.startsWith("https://")) {
    throw new Error("❌ CLIENT_URL must use https:// in production.");
  }
}

if (googleAuthEnabled) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // Callback must point to the server URL, not the frontend
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value,
              picture: profile.photos?.[0]?.value,
            });
            await user.save();
          } else {
            await user.updateLoginTime();
          }

          return done(null, user);
        } catch (err) {
          console.error("❌ Error in GoogleStrategy:", err);
          return done(err, null);
        }
      }
    )
  );
}

// Store only user.id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve full user from DB by id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error("❌ Error in deserializeUser:", err);
    done(err, null);
  }
});

export default passport;
