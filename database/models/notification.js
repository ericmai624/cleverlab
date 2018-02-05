import mongoose from 'mongoose';

const { Schema } = mongoose;

export default {
  documentName: 'Notification',
  fields: new mongoose.Schema(
    {
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      recipient: { type: Schema.Types.ObjectId, ref: 'User' },
      body: String,
      viewedByRecipient: { type: Boolean, default: false },
      viewedAt: Date
    }, 
    {
      timestamps: true 
    }
  )
};
