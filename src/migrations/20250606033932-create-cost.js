'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      typeExam: {
        type: Sequelize.STRING,
      },
      Starters: {
        type: Sequelize.STRING,
      },
      Movers: {
        type: Sequelize.STRING,
      },
      Flyers: {
        type: Sequelize.STRING,
      },
      KETfS: {
        type: Sequelize.STRING,
      },
      PETfS: {
        type: Sequelize.STRING,
      },
      FCEfS: {
        type: Sequelize.STRING,
      },
      KET: {
        type: Sequelize.STRING,
      },
      PET: {
        type: Sequelize.STRING,
      },
      FCE: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Costs');
  },
};
