import express from 'express';
import { Blog } from '../../models/Blog.js';
import { accessibleBy } from '@casl/mongoose';
import { ForbiddenError } from '@casl/ability';

const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).accessibleBy(req.ability);
  res.send({ data: blogs });
});

router.post('/', async (req, res) => {
  const blog = new Blog({ ...req.body, _authorId: req.user._id });
  ForbiddenError.from(req.ability).throwUnlessCan('create', blog);
  await blog.save();
  res.send({ data: blog });
});

export default router;
