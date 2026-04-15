const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    // Detailed fields
    biography: { type: String },
    education: [{ type: String }],
    experience: [{ type: String }],
    workingHours: { type: String },
    specialization: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
