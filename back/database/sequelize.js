const Sequelize = require('sequelize')

module.exports = new Sequelize('DB_tekru', 'phpmyadmin', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

