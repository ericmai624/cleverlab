import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import config from './config/config';

const env = process.env.NODE_ENV || 'development';
const { uri } = config[env];

mongoose.connect(uri);

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => /^\w+\.js$/gi.test(file))
  .forEach(file => {
    const { default: schema } = require(path.join(__dirname, 'models', file));
    
    mongoose.model(schema.documentName, schema.fields);
  })
;

export default mongoose.models;
