'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tasks.belongsTo(models.lists, {
        foreignKey: "listId"
      })
    }
  }
  tasks.init({
    listId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tasks',
    timestamps: true
  });
  return tasks;
};