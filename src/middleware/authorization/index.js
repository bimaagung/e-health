const jwt = require('jsonwebtoken');
const resData = require('../../helper/response');

function getToken(authHeader) {
  let splitHeader;

  try {
    splitHeader = authHeader.split(' ');
  } catch (error) {
    console.log(error);
    return null;
  }

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

const authorized = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization !== undefined && typeof authorization !== 'string') {
    return null;
  }

  let token = getToken(authorization);

  let payload;
  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  } catch (error) {
    console.log(error);
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = {
    id: payload.id,
    username: payload.username,
    firstName: payload.first_name,
    lastName: payload.last_name,
    email: payload.email,
    roleId: payload.roleId,
  };

  next();
};

const admin = (req, res, next) => {
  if (req.user.roleId !== 1) {
    return res.status(401).json(resData.failed('unauthorized'));
  }
  next();
};

const doctor = (req, res, next) => {
  if (req.user.roleId !== 2) {
    return res.status(401).json(resData.failed('unauthorized'));
  }
  next();
};

module.exports = { authorized, admin, doctor };
