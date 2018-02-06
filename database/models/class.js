import mongoose from 'mongoose';

export default {
  documentName: 'Class',
  fields: new mongoose.Schema(
    {
      name: String
    }, 
    { 
      timestamps: true 
    }
  )
};
