import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import db from "../db.js";

config();

export function configureStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        return findOrCreateUser(profile, cb);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, displayName: user.displayName, image: user.image, provider: user.provider });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}

function findOrCreateUser(profile, cb) {
  db.get("SELECT * FROM users WHERE id=?", [profile.id], (err, row) => {
    if (err) return cb(err);
    if (row) return cb(null, row);
    const { id, displayName, photos, provider } = profile;
    db.run("INSERT INTO users(id, provider, displayName, image) VALUES (?,?,?,?)", [id, provider, displayName, photos[0]]);
    return findOrCreateUser(profile, cb);
  });
}
