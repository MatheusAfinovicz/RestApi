import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Book from '../models/Book';
import User from '../models/User';

const models = [Book, User];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
