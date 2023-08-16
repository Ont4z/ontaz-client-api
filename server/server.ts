import express, { Application } from "express";
import cors from 'cors';
import http from 'http';
import SocketIO from 'socket.io';

import authRoutes from '../routes/auth.routes';


const { dbConnection } = require('../database/config');

const { socketController } = require('../sockets/sockets.controller');

class Server {
  private app: Application;
  private port: string;
  private server: http.Server;
  private io: SocketIO.Server;
  private apiPaths = {
    auth: '/api/auth'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "9001";
    this.server = http.createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.connectDatabase();

    this.middleware();

    this.routes();

    this.sockets();
  }

  async connectDatabase() {
    await dbConnection();
  }

  middleware() {
    //cors
    this.app.use(cors());
    //body parser
    this.app.use(express.json());
    //public folder
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes);
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port + "...");
    });
  }
}

export default Server;
