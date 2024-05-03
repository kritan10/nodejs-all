import { Router } from "express";
import { signInUser, signUpUser } from "./authenticate.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await signInUser(email, password);
  res.send(result);
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await signUpUser(email, password);
  res.send(result);
});

export { router as authRouter };
