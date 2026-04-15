const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    features: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("About", aboutSchema);
