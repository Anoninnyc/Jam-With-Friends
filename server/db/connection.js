const Sequelize = require('sequelize');
require('dotenv').config();

const db_host = process.env.heroku_db_host;
const db_user = process.env.heroku_db_user;
const db_password = process.env.heroku_db_password;
const db_name = process.env.heroku_db_name;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: 'postgres' /*'mysql'*/,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

module.exports = {
  sequelize,
  Sequelize
};
