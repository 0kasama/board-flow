const { lists } = require("../models");

const findAll = async (boardId) => {
  const whereOptions = {};
  if (boardId) {
    whereOptions.boardId = +boardId;
  }

  return lists.findAll({
    where: whereOptions,
  });
};

const findOne = async (params) => {
  const { id } = params;
  const list = await lists.findOne({
    where: {
      id: +id,
    },
  });

  if (!list) {
    throw {
      name: "ErrorNotFound",
    };
  }

  return list;
};

const create = async (params) => {
  const list = await lists.create({
    boardId: params.boardId,
    title: params.title,
  });

  return list;
};

const update = async (params) => {
  const { id, data } = params;

  const list = await lists.findOne({
    where: {
      id: +id,
    },
  });

  if (!list) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await list.update(data);
};

const destroy = async (params) => {
  const { id } = params;

  const list = await lists.findOne({
    where: {
      id: +id,
    },
  });

  if (!list) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await list.destroy();

  return list;
};

module.exports = { findAll, findOne, create, update, destroy };
