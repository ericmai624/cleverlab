import Sequelize from 'sequelize';
import config from './config/config.json';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import associate from './relations';

/* database configurations */
const env = process.env.NODE_ENV || 'development';
const { database, user, password, host, dialect, pool } = config[env];

const db = new Sequelize(database, user, password, { host, dialect, pool });

fs
  .readdirSync(path.join(__dirname, 'models')) // this only runs once so it's ok to use sync instead of async
  .filter(file => (/^\w+\.js$/gi.test(file))) // ensure file is a js file
  .forEach(file => db.import(path.join(__dirname, 'models', file))) // use import to load each model
;

associate(db.models); // this sets up the relationship between models

/* start database */
db
  .authenticate()
  .then(() => {
    return db.sync();
  })
  .then(() => {
    console.log(chalk.bgGreen(chalk.black(`database ${database} is running on ${host}`)));
  })
  .catch(err => {
    console.error(chalk.bold.red('Unable to connect to the database:'), err);
  })
;

export default db.models;