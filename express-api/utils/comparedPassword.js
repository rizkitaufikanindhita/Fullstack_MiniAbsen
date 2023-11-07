const checkNip = require("./checkNip");

const bcrypt = require("bcrypt");

const comparedPassword = async (nip, password) => {
  const { user } = await checkNip(nip);
  const comparePassword = await bcrypt.compare(password, user.password);
  return comparePassword;
};

module.exports = comparedPassword;
