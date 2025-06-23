'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      dateBirth: DataTypes.STRING, // Changed to STRING to handle various date formats
      // Allow null for flexibility and validate that the string is a date
      // validate: { isDate: true },

      gender: DataTypes.STRING,
      idNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      school: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      homeAddress: DataTypes.STRING,
      receiverAddress: DataTypes.STRING,
      exam: DataTypes.STRING,
      typeExam: DataTypes.STRING,
      dateExam: DataTypes.STRING,
      avatar: DataTypes.STRING,
      Paid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
