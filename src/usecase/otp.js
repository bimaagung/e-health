class OTPUseCase {
  constructor(otpRepository, emailRepository, typeOtp) {
    this._otpRepository = otpRepository;
    this._emailRepository = emailRepository;
    this._typeOtp = typeOtp;
  }

  async generateOTP(email, otpType) {
    const result = {
      isSuccess: false,
      reason: null,
      statusCode: null,
      data: null,
    };

    const otpValue = {
      email,
      otpCode: null,
      otpType: otpType.toUpperCase(),
      expiredAt: null,
    };

    const validatorOTPType = this._typeOtp.find((option) => option === otpValue.otpType);

    if (validatorOTPType === undefined) {
      result.isSuccess = false;
      result.reason = 'type otp not found';
      result.statusCode = 404;
      return result;
    }

    const otp = await this._otpRepository.verifyOTPByEmail(email);

    if (otp !== null) {
      result.isSuccess = false;
      result.reason = `waiting otp until ${otp.expiredAt}`;
      result.statusCode = 400;
      return result;
    }

    await this._otpRepository.deleteOTP(email);

    otpValue.otpCode = this.createOTPCode(6);
    otpValue.expiredAt = this.expiredAt(2);

    const addOTP = await this._otpRepository.addOTP(otpValue);

    const text = `OTP Code : ${addOTP.otpCode}`;
    const html = `<p>OTP Code : ${addOTP.otpCode}<p>`;

    await this._emailRepository.sendEmail(`OTP ${otpValue.otpType}`, email, text, html);

    result.isSuccess = true;
    result.statusCode = 200;
    result.reason = 'check your email';

    return result;
  }

  createOTPCode(count) {
    let randomString = '';

    for (let i = 0; i < count; i += 1) {
      randomString += Math.floor(Math.random() * 10);
    }

    return randomString;
  }

  expiredAt(minutes) {
    const currentDate = new Date();
    const expiredAt = new Date(currentDate.getTime() + minutes * 60000);
    return expiredAt;
  }
}

module.exports = OTPUseCase;
