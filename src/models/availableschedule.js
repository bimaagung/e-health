'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvailableSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AvailableSchedule.init({
    dayNameId: DataTypes.INTEGER,
    time: DataTypes.TIME,
    doctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AvailableSchedule',
  });
  return AvailableSchedule;
};