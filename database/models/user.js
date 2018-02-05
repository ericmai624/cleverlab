import mongoose from 'mongoose';

export default {
  documentName: 'User',
  fields: new mongoose.Schema({
    id: String,
    userType: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
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
    activeClasses: Array,
    archievedClasses: Array,
    resetPasswordExpires: Date,
    resetPasswordToken: String
  })
};

