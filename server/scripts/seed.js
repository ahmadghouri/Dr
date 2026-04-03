const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    try {
        await User.deleteMany();

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            isAdmin: true
        });

        const regularUser = await User.create({
            name: 'Regular User',
            email: 'user@example.com',
            password: 'user123',
            isAdmin: false
        });

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
