// models/Banner.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {}
  }

  Banner.init(
    {
      imageUrl: DataTypes.STRING, // lưu URL ảnh hoặc path ảnh upload
      type: DataTypes.STRING, // 'upload' hoặc 'link'
    },
    {
      sequelize,
      modelName: 'Banner',
    }
  );
  return Banner;
};
