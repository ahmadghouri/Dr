const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const DoctorAvailability = require("../models/DoctorAvailability");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Doctor.deleteMany();
    await DoctorAvailability.deleteMany();

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

    // 2. Seed Doctors
    const doctors = await Doctor.create([
      {
        name: "Prof. Dr.Awais Malik",
        expertise: "Advanced Laparoscopic & Bariatric Surgery",
        description:
          "A highly respected advanced laparoscopic and bariatric surgeon, recognized for precision surgery, ethical practice, and patient-centered outcomes.",
        biography:
          "Prof. Dr.Awais Malik is an advanced laparoscopic and bariatric surgeon with a commitment to evidence-based medicine, meticulous surgical technique, and compassionate care. Renowned for his calm demeanor, clinical judgment, and commitment to excellence, he believes successful surgery is built on trust, communication, and continuity of care.",
        email: "drowais@example.com",
        phoneNumber: "+923001234567",
        education: [
          "Professor of General and Minimally Access Surgery",
          "Undergraduate and Postgraduate Surgical Trainer & Researcher",
        ],
        experience: [
          "Over 10 years of clinical, academic, and surgical experience",
          "Professor at Fatima Memorial College of Medicine & Dentistry",
          "Consultant Surgeon at Midcity Hospital Lahore",
        ],
        workingHours: "Available upon appointment",
        specialization: [
          "Advanced Laparoscopic Procedures",
          "Bariatric (Metabolic) Surgery",
          "Modern Weight-Loss Surgeries",
          "Minimally Invasive Surgical Techniques",
        ],
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2080&auto=format&fit=crop",
      },
    ]);

    // Seed default availability for Dr. Awais Malik (Monday to Saturday, 9am to 5pm)
    const doctorId = doctors[0]._id;
    const availabilityDays = [1, 2, 3, 4, 5, 6]; // 0=Sunday, 1=Monday to 6=Saturday

    for (const dayOfWeek of availabilityDays) {
      await DoctorAvailability.create({
        doctorId,
        dayOfWeek,
        startTime: "09:00",
        endTime: "17:00",
        slotDuration: 30, // 30 minutes per slot
        isActive: true,
      });
    }

    console.log("Database Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
