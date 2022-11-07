const { Op } = require('sequelize');
const { Otp } = require('../models');

class OTPRepository {
  constructor() {
    this._otpModel = Otp;
  }

  async verifyOTPByEmail(email) {
    const result = await this._otpModel.findOne({
      where: {
        email,
        expiredAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    return result;
  }

  async verifyOTPByOTPCode(email, otpCode, otpType) {
    const result = await this._otpModel.findOne({
      where: {
        email,
        otpCode,
        otpType,
        expired_at: {
          [Op.gt]: new Date(),
        },
      },
    });

    return result;
  }

  async addOTP(otpValue) {
    const result = await this._otpModel.create(otpValue);
    return result;
  }

  async deleteOTP(email) {
    const result = await this._otpModel.destroy({ where: { email } });
    return result;
  }
}

module.exports = OTPRepository;
