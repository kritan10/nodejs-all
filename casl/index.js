import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/auth/index.js';
import blogRouter from './routes/blog/index.js';
import userRouter from './routes/user/index.js';
import authHandler from './passport/jwt-strategy.js';
import { caslAuthzMiddleware } from './middlewares/casl.middleware.js';

const app = express();

app.use(express.json());

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use('/auth', authRouter);

app.use('/blog', authHandler, caslAuthzMiddleware, blogRouter);
app.use('/user', authHandler, caslAuthzMiddleware, userRouter);

await mongoose.connect('mongodb://127.0.0.1:27017/casldb').then(() => {
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
});
