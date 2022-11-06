'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AviabeleDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AviabeleDate.init({
    dayName: DataTypes.STRING,
    time: DataTypes.TIME,
    dockterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AviabeleDate',
  });
  return AviabeleDate;
};