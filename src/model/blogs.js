const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogtitle: {
    type: String,
    required: true,
  },
  blogdescription: { type: String, required: true },

  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
