const { Model, DataTypes } =  require('sequelize')
const sequelize = require("../database");

class Card extends Model {}

Card.init({
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    sequelize, 
    modelName: 'Card',
    timestamps: false
})

module.exports = Card