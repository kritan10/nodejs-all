import express from 'express';
import jwt from 'jsonwebtoken';
import loginHandler from '../../passport/local-strategy.js';
import { User } from '../../models/User.js';

const router = express.Router();

router.post('/login', loginHandler, (req, res) => {
  const payload = { sub: req.user._id };
  res.status(200).send({ access_token: jwt.sign(payload, 'myjwtsecret', { expiresIn: '1d' }) });
});

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(200).send({ data: user });
});

export default router;
