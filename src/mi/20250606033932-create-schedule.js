'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      Starters: {
        type: Sequelize.INTEGER,
      },
      Movers: {
        type: Sequelize.INTEGER,
      },
      Flyers: {
        type: Sequelize.INTEGER,
      },
      KETfS: {
        type: Sequelize.INTEGER,
      },
      PETfS: {
        type: Sequelize.INTEGER,
      },
      FCEfS: {
        type: Sequelize.INTEGER,
      },
      KET: {
        type: Sequelize.INTEGER,
      },
      PET: {
        type: Sequelize.INTEGER,
      },
      FCE: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schedule');
  },
};
