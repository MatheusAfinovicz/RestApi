import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Book from '../models/Book';

const models = [Book];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
