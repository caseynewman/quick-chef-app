const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends Model {}
Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
    readyTime: {
      type: DataTypes.INTEGER,
    },
    ingredients: {
      type: DataTypes.TEXT("long"),
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    diets: {
      type: DataTypes.TEXT
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'User',
          key: 'id'
      }
    }

    // date_created: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Favorite;
