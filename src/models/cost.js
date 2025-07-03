'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cost.init(
    {
      typeExam: DataTypes.STRING,
      Starters: DataTypes.INTEGER,
      Movers: DataTypes.INTEGER,
      Flyers: DataTypes.INTEGER,
      KETfS: DataTypes.INTEGER,
      PETfS: DataTypes.INTEGER,
      FCEfS: DataTypes.INTEGER,
      KET: DataTypes.INTEGER,
      PET: DataTypes.INTEGER,
      FCE: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cost',
    }
  );
  return Cost;
};
