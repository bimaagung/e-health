const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_AGE,
    },
  );

  return accessToken;
};

module.exports = { generateToken };
