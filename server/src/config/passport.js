// server/src/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config(); // Ensure env variables are loaded

// ✅ Safety check for required environment variables
if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.SERVER_URL
) {
  throw new Error(
    "❌ Missing required Google OAuth environment variables. Please check .env file."
  );
}

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
        // console.log("🔐 Google Profile Data:", {
        //   id: profile.id,
        //   displayName: profile.displayName,
        //   email: profile.emails?.[0]?.value,
        //   photo: profile.photos?.[0]?.value,
        // });
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
