module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serie: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      volume: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
