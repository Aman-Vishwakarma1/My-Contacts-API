const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" 
    },
    name: {
      type: String,
      required: [true, "Please add contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: [true, "Email already registered"]
    },
    phone: {
      type: String,
      required: [true, "Please add Phone Number"],
      unique: [true, "Phone already registered"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);