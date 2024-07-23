const { tasks } = require("../models");

const findAll = async (listId) => {
  const whereOptions = {};
  if (listId) {
    whereOptions.listId = +listId;
  }

  return tasks.findAll({
    where: whereOptions,
  });
};

const findOne = async (params) => {
  const { id } = params;
  const task = await tasks.findOne({
    where: {
      id: +id,
    },
  });

  if (!task) {
    throw {
      name: "ErrorNotFound",
    };
  }

  return task;
};

const create = async (params) => {
  const task = await tasks.create({
    listId: params.listId,
    title: params.title,
    description: params.description,
    dueDate: params.dueDate,
  });

  return task;
};

const update = async (params) => {
  const { id, data } = params;

  const task = await tasks.findOne({
    where: {
      id: +id,
    },
  });

  if (!task) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await task.update(data);
};

const destroy = async (params) => {
  const { id } = params;

  const task = await tasks.findOne({
    where: {
      id: +id,
    },
  });

  if (!task) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await task.destroy();

  return task;
};

module.exports = { findAll, findOne, create, update, destroy };
