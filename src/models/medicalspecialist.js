'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalSpecialist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MedicalSpecialist.init({
    specialistName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedicalSpecialist',
  });
  return MedicalSpecialist;
};