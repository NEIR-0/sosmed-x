require("dotenv").config();

const { createToken, verifyToken } = require("../helper/jwt");
const auth = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("invalid Token");

    const rawToken = authorization.split(" ");
    if (rawToken[0] !== "Bearer") throw new Error("invalid Token");

    const verify = verifyToken(rawToken[1]);
    const userId = verify.id;
    return userId;
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
