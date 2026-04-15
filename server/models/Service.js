const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }, // Can be lucide icon name or URL
    iconBg: { type: String, default: "bg-white" },
    image: { type: String }, // Cloudinary URL
    buttonBg: { type: String, default: "bg-white" },
    buttonText: { type: String, default: "text-[#1A1A1A]" },
    // Detailed fields
    detailedDescription: { type: String },
    features: [{ type: String }],
    benefits: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
