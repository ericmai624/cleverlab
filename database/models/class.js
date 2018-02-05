import mongoose from 'mongoose';

export default {
  documentName: 'Class',
  fields: new mongoose.Schema({
    id: String,
    name: String
  })
};
