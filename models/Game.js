const { Model, DataTypes } =  require('sequelize')
const sequelize = require("../database");
const User = require("./User.js");

class Game extends Model {}

Game.init({
    maxAttempts: {
        type: DataTypes.INTEGER
    },
    attempts: {
        type: DataTypes.INTEGER
    },
    isWinner: {
        type: DataTypes.BOOLEAN
    },
    difficulty: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
    }
},
{
    sequelize, 
    modelName: 'Game'
})

module.exports = Game