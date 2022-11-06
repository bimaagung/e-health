'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApprovedValidation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApprovedValidation.init({
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ApprovedValidation',
  });
  return ApprovedValidation;
};