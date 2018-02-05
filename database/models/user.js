import mongoose from 'mongoose';

const { Schema } = mongoose;

export default {
  documentName: 'User',
  fields: new Schema(
    {
      userType: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        index: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      firstName: String,
      lastName: String,
      isEmailVerified: Boolean,
      lastLogin: Date,
      loginCounts: Number,
      activeClasses: [ { type: Schema.Types.ObjectId, ref: 'Class' } ],
      archievedClasses: [ { type: Schema.Types.ObjectId, ref: 'Class' } ],
      resetPasswordExpires: Date,
      resetPasswordToken: String,
      notifications: [ { type: Schema.Types.ObjectId, ref: 'Notification' } ]
    },
    {
      timestamps: true
    }
  )
};
