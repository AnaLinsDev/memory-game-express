const { Model, DataTypes } =  require('sequelize')
const sequelize = require("../database");
const Game = require("./Game")

class User extends Model {}

/*
1º arg -> Data from object
2º arg -> Sequelize instance
*/
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    victories: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize, 
    modelName: 'User',
    // timestamps: false
})

User.hasMany(Game, { foreignKey: 'userId' })

module.exports = User