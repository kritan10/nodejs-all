import http from 'http';
import express from 'express';
import morgan from 'morgan';
import { expressConnectMiddleware } from '@connectrpc/connect-express';
// import { createConnectRouter } from '@connectrpc/connect';
import { ComputerService } from './gen/computer_connect.js';
import { v4 } from 'uuid';

const app = express();
const routes = (router) =>
  router.service(ComputerService, {
    async createComputer(req) {
      console.log(req);
      return { model: req.computer.model, id: v4() };
    },
  });
app.use(morgan('dev'));
app.use(
  expressConnectMiddleware({
    routes,
  })
);

http.createServer(app).listen(8080);
