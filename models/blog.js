const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: [String], default: [] },
    likesCount: { type: Number, default: 0 },
    bookmarks: { type: [String], default: [] },
    lastEdited: { type: Date, default: new Date() },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
