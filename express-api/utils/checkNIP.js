const User = require("../models/users");

const checkNip = async (nip) => {
  const user = await User.findOne({ where: { nip: nip } });
  return { user };
};

module.exports = checkNip;
