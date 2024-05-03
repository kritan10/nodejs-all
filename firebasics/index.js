import express from "express";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { initializeApp as initializeAdminApp } from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";

import { authRouter } from "./routes.js";

dotenv.config();

// use firebase if you need to create a proxy between firebase and client app
/** @type {import('firebase/app').FirebaseOptions} */
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
// initializeApp(firebaseConfig);

//use firebase-admin if you need to directly interact with firebase data such as token validation
/** @type {import('firebase-admin/app').AppOptions} */
const firebaseAdminConfig = {
  credential: applicationDefault(),
};
initializeAdminApp(firebaseAdminConfig);

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
