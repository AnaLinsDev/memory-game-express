const { Model, DataTypes } =  require('sequelize')
const sequelize = require("../database");

class Config extends Model {}

Config.init({
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    sequelize, 
    modelName: 'Config'
})

module.exports = Config