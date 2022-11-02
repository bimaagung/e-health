const mockOtpRepo = ({
  returnDeleteAllOtp,
  returnGenerateOtp,
  returnGetOtp,
  returnGetOtpByEmail,
}) => {
  const repo = {};
  const otp = {
    email: "customer@mail",
    otp_code: "123456",
    otp_type: "REGISTRATION",
    expired_at: "12-09-2022 23:30:00",
  };

  repo.deleteAllOtp = jest
    .fn()
    .mockReturnValue(returnDeleteAllOtp !== true ? returnDeleteAllOtp : true);

  repo.generateOtp = jest
    .fn()
    .mockReturnValue(returnGenerateOtp !== true ? returnGenerateOtp : otp);
  repo.getOTP = jest
    .fn()
    .mockReturnValue(returnGetOtp !== true ? returnGetOtp : otp);
  repo.returnGetOtpByEmail = jest
    .fn()
    .mockReturnValue(returnGetOtpByEmail !== true ? returnGetOtpByEmail : otp);

  return repo;
};

module.exports = mockOtpRepo;
