import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import './database';

import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';
import bookRoutes from './routes/book';

class App {
  private _app;

  constructor() {
    this._app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(express.json());
  }

  routes() {
    this._app.use('/', homeRoutes);
    this._app.use('/books/', bookRoutes);
    this._app.use('/users/', userRoutes);
    this._app.use('/tokens/', tokenRoutes);
  }

  get app() {
    return this._app;
  }
}

export default new App().app;
