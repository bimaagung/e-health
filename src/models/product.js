'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    isStrip: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    indication: DataTypes.TEXT,
    composition: DataTypes.TEXT,
    dose: DataTypes.TEXT,
    use: DataTypes.STRING,
    sideEffect: DataTypes.TEXT,
    segmentation: DataTypes.STRING,
    packaging: DataTypes.STRING,
    manufacture: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    urlImage: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};