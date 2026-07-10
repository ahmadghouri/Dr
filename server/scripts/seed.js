const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const DoctorAvailability = require("../models/DoctorAvailability");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Doctor.deleteMany();

    // 1. Seed Users
    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      isAdmin: true,
    });

    await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: "user123",
      isAdmin: false,
    });



    // Clear existing doctor availability
    await DoctorAvailability.deleteMany();

    // Seed default availability for Dr. Awais Malik (Monday to Saturday, 9am to 5pm)
    const doctorId = doctors[0]._id;
    const availabilityDays = [1, 2, 3, 4, 5, 6]; // 0=Sunday, 1=Monday to 6=Saturday

    for (const dayOfWeek of availabilityDays) {
      await DoctorAvailability.create({
        doctorId,
        dayOfWeek,
        startTime: "09:00",
        endTime: "17:00",
        slotDuration: 60, // 60 minutes per slot
        isActive: true,
      });
    }

    console.log("Database Seeded Successfully with all Frontend Data");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
