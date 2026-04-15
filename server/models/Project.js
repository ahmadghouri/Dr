const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    description: { type: String },
    location: { type: String },
    client: { type: String },
    website: { type: String },
    fullContent: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
