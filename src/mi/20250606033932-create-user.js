'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      dateBirth: {
        type: Sequelize.STRING, // Changed to STRING to handle various date formats
        allowNull: true, // Allow null for flexibility
        validate: {
          isDate: true, // Validate that the string is a date
        },
      },
      gender: {
        type: Sequelize.STRING,
      },
      idNumber: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },
      school: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      homeAddress: {
        type: Sequelize.STRING,
      },
      receiverAddress: {
        type: Sequelize.STRING,
      },
      exam: {
        type: Sequelize.STRING,
      },
      typeExam: {
        type: Sequelize.STRING,
      },
      dateExam: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      Paid: {
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
    await queryInterface.dropTable('Users');
  },
};
