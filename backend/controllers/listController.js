const listService = require("../services/listService");

const findAll = async (req, res, next) => {
  try {
    const boardId = req.query.boardId;
    if (boardId) {
      const lists = await listService.findAll(boardId);
      res.status(200).json({ message: "Get all lists by board id", lists });
    } else {
      const lists = await listService.findAll();
      res.status(200).json({ message: "Get all lists", lists });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };
    const list = await listService.findOne(params);

    res.status(200).json({ message: "Get list by id", list });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = {
      boardId: req.body.boardId,
      title: req.body.title,
    };

    const question = await listService.create(data);

    res.status(201).json({ message: "Successfully created", question });
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
    const question = await listService.update(params);

    res.status(201).json({ message: "Update success", question });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const params = {
      id: req.params.id,
    };

    const question = await listService.destroy(params);

    res.status(200).json({ message: "Deleted", question });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
