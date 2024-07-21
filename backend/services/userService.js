const { hashPassword } = require("../libs/bcrypt");
const { users } = require("../models");

const findOne = async (id) => {
  try {
    const user = await users.findOne({
      where: { id },
    });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const update = async (params) => {
  const { id, data } = params;

  const user = await users.findOne({
    where: { id },
  });

  if (!user) {
    throw {
      name: "ErrorNotFound",
    };
  }

  if (data.password) {
    data.password = hashPassword(data.password);
  }

  await user.update(data);

  return user;
};

module.exports = { findOne, update };
