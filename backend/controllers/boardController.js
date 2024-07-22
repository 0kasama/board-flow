const boardService = require("../services/boardService");

const findAll = async (req, res, next) => {
  try {
    const boards = await boardService.findAll();

    res.status(200).json({ message: "Get all boards", boards });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const board = await boardService.findOne(params);

    res.status(200).json({ message: "Get board by id", board });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {
      userId: req.loggedUser.id,
      title: req.body.title,
    };

    const board = await boardService.create(data);

    res.status(201).json({ message: "Successfully created", board });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


const update = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
      data: req.body,
    };
    const board = await boardService.update(params);

    res.status(201).json({ message: "Update success", board });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      id: req.params.id,
    };

    const board = await boardService.destroy(params);

    res.status(200).json({ message: "Deleted", board });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
