const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Service = require("../models/Service");
const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Doctor = require("../models/Doctor");
const About = require("../models/About");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await Blog.deleteMany();
    await Doctor.deleteMany();
    await About.deleteMany();

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

    // 2. Seed Services
    await Service.create([
      {
        title: "Quality Care Service",
        description:
          "Health care is a vital aspect maintaining overall well-being, encompassing a range",
        detailedDescription:
          "Our quality care service provides comprehensive medical attention tailored to your specific needs. We combine advanced technology with compassionate care to ensure the best outcomes for our patients.",
        features: ["24/7 Monitoring", "Expert Nursing", "Advanced Diagnostics"],
        benefits: ["Faster Recovery", "Personalized Care", "Peace of Mind"],
        icon: "Stethoscope",
        iconBg: "bg-[#C1FF72]",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
        buttonBg: "bg-[#00A78E]",
        buttonText: "text-white",
      },
      {
        title: "Your Wellness Priority",
        description:
          "Health care is a vital aspect maintaining overall well-being, encompassing a range",
        detailedDescription:
          "We prioritize your wellness through preventive care and healthy lifestyle guidance. Our holistic approach ensures that every aspect of your health is addressed.",
        features: [
          "Wellness Checkups",
          "Nutritional Advice",
          "Mental Health Support",
        ],
        benefits: ["Long-term Health", "Improved Energy", "Disease Prevention"],
        icon: "Pill",
        iconBg: "bg-white border border-gray-100",
        image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop",
        buttonBg: "bg-white",
        buttonText: "text-[#1A1A1A] border border-gray-100",
      },
      {
        title: "Caring for You Always",
        description:
          "Health care is a vital aspect maintaining overall well-being, encompassing a range",
        detailedDescription:
          "Our commitment to your health is constant. We offer round-the-clock support and medical services to be there whenever you need us most.",
        features: ["Emergency Care", "Home Visits", "Telemedicine"],
        benefits: ["Immediate Response", "Convenience", "Constant Support"],
        icon: "ClipboardList",
        iconBg: "bg-white border border-gray-100",
        image:
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
        buttonBg: "bg-white",
        buttonText: "text-[#1A1A1A] border border-gray-100",
      },
    ]);

    // 3. Seed Projects
    await Project.create([
      {
        category: "Care Plus",
        title: "Wellness Begins with Us",
        image:
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
      },
      {
        category: "Renew Health Center",
        title: "Quality health close to home",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71f1e598c6?q=80&w=2070&auto=format&fit=crop",
      },
      {
        category: "Medical Care",
        title: "Your Journey to Better Health",
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
      },
      {
        category: "Health First",
        title: "Expert Care, Exceptional Results",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
      },
    ]);

    // 4. Seed Blogs
    await Blog.create([
      {
        title: "Quality Care Exceptional Best Service",
        summary:
          "Discover how quality medical care can transform lives through dedicated service and expertise.",
        fullContent:
          "Quality medical care is not just about treating symptoms; it's about understanding the patient as a whole. In this post, we explore the various facets of exceptional medical service and why it matters for long-term health outcomes.",
        image:
          "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
        category: "Medical",
        tags: ["Care", "Health", "Service"],
        isFeatured: false,
      },
      {
        title: "Medical care encompasses a range of services",
        summary:
          "From preventive care to emergency response, medical services are diverse and essential.",
        fullContent:
          "The scope of modern medical care is vast. We delve into the different types of services available today, including primary care, specialty treatments, and the importance of integrated health systems.",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71f1e598c6?q=80&w=2070&auto=format&fit=crop",
        category: "Education",
        tags: ["Education", "Medicine"],
        isFeatured: false,
      },
      {
        title: "Tomorrow's Health is a for Better Health",
        summary:
          "Investing in today's medical advancements for a healthier future for all.",
        fullContent:
          "The future of medicine is here. From AI-driven diagnostics to personalized gene therapy, we look at how tomorrow's health technology is being shaped today to provide better care for everyone.",
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
        category: "Technology",
        tags: ["Future", "Innovation"],
        isFeatured: false,
      },
      {
        title: "Health Matters, We Care Wellness Begins with Us",
        summary:
          "At MediZen, we believe that true wellness starts with compassionate care and community support.",
        fullContent:
          "Wellness is a journey, and we are here to walk it with you. Our philosophy centers on community, empathy, and providing the highest standard of care to ensure that health truly matters in every home.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dad99901?q=80&w=2070&auto=format&fit=crop",
        category: "Wellness",
        tags: ["Wellness", "Community"],
        isFeatured: true,
      },
    ]);

    // 5. Seed Doctors
    await Doctor.create([
      {
        name: "Prof. Dr.Awais Malik",
        expertise: "Advanced Laparoscopic & Bariatric Surgery",
        description:
          "A highly respected advanced laparoscopic and bariatric surgeon, recognized for precision surgery, ethical practice, and patient-centered outcomes.",
        biography:
          "Prof. Dr.Awais Malik is an advanced laparoscopic and bariatric surgeon with a commitment to evidence-based medicine, meticulous surgical technique, and compassionate care. Renowned for his calm demeanor, clinical judgment, and commitment to excellence, he believes successful surgery is built on trust, communication, and continuity of care.",
        education: [
          "Professor of General and Minimally Access Surgery",
    "Undergraduate and Postgraduate Surgical Trainer & Researcher"
        ],
        experience: [
       "Over 10 years of clinical, academic, and surgical experience",
    "Professor at Fatima Memorial College of Medicine & Dentistry",
    "Consultant Surgeon at Midcity Hospital Lahore"
        ],
        workingHours: "Available upon appointment",
        specialization: ["Advanced Laparoscopic Procedures", 
    "Bariatric (Metabolic) Surgery", 
    "Modern Weight-Loss Surgeries",
    "Minimally Invasive Surgical Techniques"],
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      },
    ]);

    // 6. Seed About
    await About.create({
      title: "Compassionate Care Always There Health First",
      description:
        "Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting",
      image:
        "https://res.cloudinary.com/demo/image/upload/v1625211244/sample.jpg", // Placeholder
      features: [
        {
          title: "Enhancing Lives Through Care",
          description:
            "Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting",
        },
        {
          title: "Tomorrow's Health, Today's Care",
          description:
            "Health care is a vital aspect of maintaining overall well-being, encompassing a range of services from preventive care to treatment of cuses on promoting",
        },
      ],
      stats: [
        { label: "Happy Patients", value: "10k+" },
        { label: "Expert Doctors", value: "50+" },
        { label: "Medical Beds", value: "200+" },
        { label: "Years Experience", value: "15+" },
      ],
    });

    console.log("Database Seeded Successfully with all Frontend Data");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
