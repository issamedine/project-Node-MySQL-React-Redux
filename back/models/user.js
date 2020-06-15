const sequelize = require("../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define("Contacts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  family_name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  // last_login_date: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  // },
});
