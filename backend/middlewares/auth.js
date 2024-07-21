const { verifyToken } = require("../libs/jwt");
const { users } = require("../models");

const authentication = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split(" ")[1];

      const { id, name, email } = verifyToken(accessToken);

      const user = await users.findOne({
        where: { id },
      });

      if (user) {
        req.loggedUser = {
          id: user.id,
          email: user.email,
        };
        return next();
      } else {
        throw { name: "Unauthenticated", message: "User not found" };
      }
    } else {
      throw {
        name: "Unauthenticated",
        message: "Authorization header missing",
      };
    }
  } catch (err) {
    next(err);
  }
};

const authorization = async (req, res, next) => {
  try {
    if (req.loggedUser) {
      return next();
    } else {
      throw { name: "Unauthorized", message: "User not authorized" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authorization };
