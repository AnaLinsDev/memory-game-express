const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test_db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './dev.sqlite'
})

module.exports = sequelize;