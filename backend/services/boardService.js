const { boards } = require("../models");
const crypto = require("crypto");

const generateSlug = async () => {
  let slug;
  let isUnique = false;

  while (!isUnique) {
    slug = crypto.randomBytes(3).toString("hex");
    const existingImage = await boards.findOne({ where: { slug } });
    if (!existingImage) {
      isUnique = true;
    }
  }
  return slug;
};

const findAll = async () => {
  const board = await boards.findAll();

  return board;
};

const findOne = async (params) => {
  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
  const filterOption = {
    where: {},
  };

  if (isNumeric(params.id) === false) {
    filterOption.where.slug = params.id;
  } else {
    filterOption.where.id = +params.id;
  }

  const board = await boards.findOne(filterOption);

  return board;
};

const create = async (params) => {
  const slug = await generateSlug();

  const board = await boards.create({
    userId: params.userId,
    title: params.title,
    slug: slug,
  });

  return board;
};

const update = async (params) => {
  const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);
  const filterOption = {};
  if (isNumeric(params.id)) {
    filterOption.where = { id: +params.id };
  } else {
    filterOption.where = { slug: params.id };
  }

  const board = await boards.findOne(filterOption);

  if (!board) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await board.update(params.data);

  return board;
};

const destroy = async (params) => {
  const { id, userId } = params;

  const board = await boards.findOne({
    where: {
      id: +id,
      userId: userId,
    },
  });

  if (!board) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await board.destroy();

  return board;
};

module.exports = { findAll, findOne, create, update, destroy };
