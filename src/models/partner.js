// models/Partner.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    static associate(models) {}
  }

  Partner.init(
    {
      imageUrl: DataTypes.STRING, // lưu URL ảnh hoặc path ảnh upload
      type: DataTypes.STRING, // 'upload' hoặc 'link'
    },
    {
      sequelize,
      modelName: 'Partner',
    }
  );
  return Partner;
};
