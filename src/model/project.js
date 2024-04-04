const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },

  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
