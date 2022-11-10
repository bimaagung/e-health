'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorValidation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DoctorValidation.init({
    urlDoc: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    medicalSpecialistId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    status: DataTypes.STRING, 
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DoctorValidation',
  });
  return DoctorValidation;
};