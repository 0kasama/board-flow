const taskService = require("../services/taskService");

const findAll = async (req, res, next) => {
  try {
    const listId = req.query.listId;
    if (listId) {
      const tasks = await taskService.findAll(listId);
      res.status(200).json({ message: "Get all tasks by list id", tasks });
    } else {
      const tasks = await taskService.findAll();
      res.status(200).json({ message: "Get all tasks", tasks });
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
    const task = await taskService.findOne(params);

    res.status(200).json({ message: "Get task by id", task });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const params = {
      listId: req.body.listId,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
    };

    const task = await taskService.create(params);

    res.status(201).json({ message: "Successfully created", task });
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
    const question = await taskService.update(params);

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

    const question = await taskService.destroy(params);

    res.status(200).json({ message: "Deleted", question });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
