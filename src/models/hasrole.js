'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HasRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HasRole.init({
    userId: DataTypes.INTEGER,
    hasRoleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HasRole',
  });
  return HasRole;
};