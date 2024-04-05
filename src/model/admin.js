const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "Admin",
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
