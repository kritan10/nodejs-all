import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { config } from "dotenv";
import { configureStrategy } from "./auth/strategy.js";
config();

import RedisStore from "connect-redis";
import ioredis from "ioredis";
const redisClient = ioredis.createClient();

import { ensureLoggedIn } from "connect-ensure-login";
const ensureLogin = ensureLoggedIn({ redirectTo: "/auth/google" });

import logger from "morgan";

const app = express();
const port = 3000;

configureStrategy();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "hello world",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new RedisStore({ client: redisClient, prefix: "googleauth:" }),
  })
);

app.use(passport.authenticate("session"));

app.get("/", ensureLogin, (req, res) => {
  const user = req.session.passport.user;
  res.send({
    data: {
      user: user,
      dashboard: "Other dashboard data",
    },
  });
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
  // Successful authentication, redirect home.
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
