const { Model, DataTypes } =  require('sequelize')
const sequelize = require("../database");

class Game extends Model {}

Game.init({
    maxAttempts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attempts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isWinner: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize, 
    modelName: 'Game'
})

module.exports = Game