const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String }, // For full article if needed
    image: { type: String, required: true }, // Cloudinary URL
    author: { type: String, default: "Admin" },
    isFeatured: { type: Boolean, default: false },
    // Detailed fields
    summary: { type: String },
    fullContent: { type: String }, // Rich text / Markdown
    tags: [{ type: String }],
    category: { type: String },
    // New detailed fields
    quote: { type: String },
    quoteAuthor: { type: String },
    quoteAuthorRole: { type: String },
    points: [{ type: String }],
    holisticTitle: { type: String },
    holisticContent: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
