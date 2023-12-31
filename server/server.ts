import express, { Application } from "express";
import cors from 'cors';
import admin from 'firebase-admin'
// import { socketController } from '../sockets/sockets.controller'

import authRoutes from '../routes/auth.routes';
import categoryRoutes from '../routes/category.routes';
import subCategoryRoutes from '../routes/subCategory.routes';
import commerceRoutes from '../routes/commerce.routes';

import { firebase } from '../firebase/firebaseConfig'

const { dbConnection } = require('../database/config');


class Server {
  private app: Application;
  private port: string;
  public server: any;
  public io: any;
  public firebase: admin.app.App;

  private apiPaths = {
    auth: '/api/auth',
    category: '/api/category',
    subCategory: '/api/subCategory',
    commerce: '/api/commerce'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "9001";
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);
    this.firebase = firebase

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
    this.app.use(this.apiPaths.category, categoryRoutes);
    this.app.use(this.apiPaths.subCategory, subCategoryRoutes);
    this.app.use(this.apiPaths.commerce, commerceRoutes);
  }

  sockets() {
    this.io.on('connection', (socket: any) => {
      console.log('Client connected', socket.id);
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server running on port " + this.port + "...");
    });
  }
}



export default Server;
