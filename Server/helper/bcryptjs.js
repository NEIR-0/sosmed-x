const bcrypt = require("bcryptjs");

const hashing = (planText) => {
  return bcrypt.hashSync(planText, bcrypt.genSaltSync(10));
};

const comparePassword = (planText, password) => {
  return bcrypt.compareSync(planText, password);
};

module.exports = { hashing, comparePassword };
