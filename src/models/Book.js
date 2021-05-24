import Sequelize, { Model } from 'sequelize';

export default class Book extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      serie: Sequelize.STRING,
      volume: Sequelize.INTEGER,
      author: Sequelize.STRING,
      published_at: Sequelize.DATE, // format: yyyy-mm-dd
      pages: Sequelize.INTEGER,
    }, {
      sequelize,
    });
    return this;
  }
}
