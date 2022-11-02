class Otp {
    constructor(otpRepository, emailRepository, emailMessage) {
        this._otpRepository = otpRepository;
        this._emailRepository = emailRepository;
        this._emailMessage = emailMessage;
    }
    async generateOTP(email, otp_type) {
        let result = {
            isSuccess: false,
            statusCode: 400,
            reason: null,
            data: null,
        };
        let otp = await this.getOTPByEmail(email);
        if (otp !== null) {
            result.reason = "wait until : " + otp.expired_at;
            return result;
        }
        let content = this._emailMessage[otp_type.toUpperCase()];
        if (typeof content === undefined) {
            return;
        }

        otp = await this._otpRepository.generateOTP(email, otp_type);
        let text = content.text_value.replace("{otp}", otp.otp_code);
        let html = content.html_value.replace("{otp}", otp.otp_code);
        await this._emailRepository.sendEmail("OTP Code", email, text, html);

        result.isSuccess = true;
        result.statusCode = 200,
        result.reason = "check your email";
        return result;
    }
    async verifyOTP(email, otp_code, otp_type) {
        let result = {
            is_success: false,
            statusCode: 400,
            reason: null,
            data: null,
        };

        let otp = await this._otpRepository.getOTP(email, otp_code, otp_type);
        if (otp === null) {
            result.reason = "invalid otp";
            return result;
        }
        result.is_success = true;
        result.statusCode = 200;
        result.reason = "otp valid";
        return result;
    }
    async getOTPByEmail(email) {
        return await this._otpRepository.getOTPByEmail(email);
    }
    async deleteAllOtp(email) {
        await this._otpRepository.deleteAllOtp(email);
    }
}
module.exports = Otp;
