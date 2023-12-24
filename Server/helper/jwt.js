const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;

const createToken = (planText) => {
  return jwt.sign(planText, secret);
};

const verifyToken = (planText) => {
  return jwt.verify(planText, secret);
};

module.exports = { createToken, verifyToken };
