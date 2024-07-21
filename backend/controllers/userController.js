const userService = require("../services/userService");

const findOne = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const data = await userService.findOne(userId);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Get User Success", data });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const params = {
      id: req.loggedUser.id,
      data: req.body,
    };
    const updatedUser = await userService.update(params);
    res
      .status(200)
      .json({ message: "Update user successful", data: updatedUser });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { findOne, update };
