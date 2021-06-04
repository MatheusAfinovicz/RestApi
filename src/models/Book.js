import Sequelize, { Model } from 'sequelize';

export default class Book extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The title field must have between 3 and 255 characters',
          },
        },
      },
      serie: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 150],
            msg: 'The serie field must have between 3 and 150 characters',
          },
        },
      },
      volume: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'The volume field must be an integer',
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'The author field must have between 3 and 255 characters',
          },
        },
      },
      published_at: {
        type: Sequelize.DATE,
        defaultValue: '',
        validate: {
          isDate: { // format: dd-mm-yyyy || dd.mm.yyyy || dd/mm/yyyy
            msg: 'The published_at field must be a date',
          },
        },
      },
      pages: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'The pages field must be an integer',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}
