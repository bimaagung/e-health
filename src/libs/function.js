const jwt = require('jsonwebtoken');
module.exports = {
  generateRandomNumber(len) {
    let randStr = '';
    for (let i = 0; i < len; i++) {
      randStr += Math.floor(Math.random() * 10);
    }
    return randStr;
  },
  generateAccessToken(data) {
    const userData = {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      is_admin: data.is_admin,
    };

    const accessToken = jwt.sign(userData, process.env.JWT_KEY_SECRET, {
      expiresIn: '6h',
    });

    return accessToken;
  },
};
