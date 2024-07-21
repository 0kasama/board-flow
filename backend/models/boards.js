'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      boards.belongsTo(models.users, {
        foreignKey: "userId"
      })
    }
  }
  boards.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'boards',
    timestamps: true
  });
  return boards;
};