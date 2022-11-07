class UserUseCase {
  constructor(userRepository, otpRepository, bcrypt, tokenManager, mediaHandler) {
    this._userRepository = userRepository;
    this._otpRepository = otpRepository;
    this._bcrypt = bcrypt;
    this._tokenManager = tokenManager;
    this._mediaHandler = mediaHandler;
  }

  async login(user) {
    const result = {
      isSuccess: false,
      reason: null,
      statusCode: null,
      tokenManager: null,
    };

    // check username/email is existing
    const userResult = await this._userRepository.getUserByUsernameOrEmail(user.usernameOrEmail);

    if (userResult === null) {
      result.reason = 'username and password incorrect';
      result.statusCode = 400;
      return result;
    }

    // compare password
    const comparePassword = await this._bcrypt.compareSync(user.password, userResult.password);

    if (comparePassword === null) {
      result.reason = 'username and password incorrect';
      result.statusCode = 400;
      return result;
    }

    const userObj = {
      id: userResult.id,
      username: userResult.username,
      first_name: userResult.firstName,
      last_name: userResult.lastName,
      email: userResult.email,
    };

    // getToken
    const tokenManager = await this._tokenManager.generateToken(userObj);

    result.isSuccess = true;
    result.statusCode = 200;
    result.token = tokenManager;

    return result;
  }

  async register(user) {
    const result = {
      isSuccess: false,
      reason: null,
      statusCode: null,
      data: null,
    };

    let userObj = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: null,
      phone: user.phone,
      avatar: null,
      roleId: user.roleId,
    };

    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();

    if (user.password !== user.confirmPassword) {
      result.reason = 'invalid password and confirm password';
      result.statusCode = 400;
      return result;
    }

    const veirifyOTP = await this._otpRepository.verifyOTPByOTPCode(user.email, user.otp_code, 'REGISTRATION');

    if (veirifyOTP === null) {
      result.reason = 'invalid otp';
      result.statusCode = 400;
      return result;
    }

    const verifyUsername = await this._userRepository.getUserByUsernameOrEmail(user.username);
    const verifyEmail = await this._userRepository.getUserByUsernameOrEmail(user.email);

    if (verifyUsername !== null || verifyEmail !== null) {
      result.reason = 'username or email is existing';
      result.statusCode = 400;
      return result;
    }

    const verifyPhoneNumber = await this._userRepository.verifyPhoneNumber(user.phone);

    if (verifyPhoneNumber !== null) {
      result.reason = 'phone already used';
      result.statusCode = 400;
      return result;
    }

    userObj.password = this._bcrypt.hashSync(user.password, 10);

    if (user.file !== undefined) {
      const urlImage = await this._mediaHandler.cloudinaryUpload(
        user.file.path,
        'user',
      );
      userObj.avatar = urlImage;
    } else {
      userObj.avatar = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`;
    }

    const addUser = await this._userRepository.addUser(userObj);

    delete userObj.password;

    userObj = {
      id: addUser.id,
      ...userObj,
    };

    const token = await this._tokenManager.generateToken(userObj);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = {
      user: userObj,
      token,
    };

    return result;
  }
}

module.exports = UserUseCase;
