import express from 'express';
import { User } from '../../models/User.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  const userData = await User.findById({ _id: req.user._id });
  res.send(userData);
});

export default router;
