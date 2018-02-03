const Sequelize = require('sequelize');
const config = require('config')['database'];
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const associate = require('./relations');

/* database configurations */
const { client: dialect, name } = config;
const { user, password, host, port, pool } = config.connection;

const db = new Sequelize(name, user, password, { host, dialect, pool });

fs
  .readdirSync(path.join(__dirname, 'models')) // this only runs once so it's ok to use sync instead of async
  .filter(file => (/^\w+\.js/i.test(file))) // ensure file is a js file
  .forEach(file => db.import(path.join(__dirname, 'models', file)).sync({ force: true }))
;

associate(db.models); // this sets up the relationship between models

/* start database */
db
  .authenticate()
  .then(() => {
    console.log(chalk.green(`database ${name} is running on ${host}:${port}`));
  })
  .catch(err => {
    console.error(chalk.bold.red('Unable to connect to the database:'), err);
  })
;

module.exports = db.models;