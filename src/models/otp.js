'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init({
    email: DataTypes.STRING,
<<<<<<< HEAD
    otp_type: DataTypes.STRING,
    otp_code: DataTypes.STRING,
    expired_at: DataTypes.DATE
=======
    otpCode: DataTypes.INTEGER,
    otpType: DataTypes.STRING,
    expiredAt: DataTypes.DATE
>>>>>>> 54d001b8777c34bfddab4ea79d33d81103daff13
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};