const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'email already registered']
  },
  phone: {
    type: Number,
    required: [true, 'Phone Number is Required'],
    unique: [true, 'phone already registered']
  },
  password: {
    type: String,
    required: [true, 'Password should not be empty']
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('users', userSchema);