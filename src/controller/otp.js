const resData = require('../helper/response');
module.exports = {
    generateOTP: async (req, res, next) => {
        let otp_type = req.body.otp_type;
        let email = req.query.email;

        try {
            let resOTP = await req.otpUC.generateOTP(email, otp_type);
            if (resOTP.isSuccess !== true) {
                return res
                    .status(resOTP.statusCode)
                    .json(resData.failed(resOTP.reason, resOTP.data));
            }
            res.status(resOTP.statusCode).json(resData.success(resOTP.data));
        } catch (e) {
            next(e);
        }
    },
    verifyOTP: async (req, res, next) => {

        let otp_code = req.query.otp_code;
        let otp_type = req.query.otp_type;
        let email = req.query.email;

        let resOTP = await req.otpUC.verifyOTP(email, otp_code, otp_type)

        try {
            if (resOTP.isSuccess !== true) {
                return res
                    .status(resOTP.statusCode)
                    .json(resData.failed(resOTP.reason, resOTP.data));
            }
            res.status(resOTP.statusCode).json(resData.success(resOTP.data));
        } catch (e) {
            next(e);
        }

    }
}