import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.MONGODB_URI;

async function createTestUser() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // Check if user already exists
    const existingUser = await User.findOne({ username: 'testuser' });
    if (existingUser) {
      console.log("Test user already exists");
      process.exit(0);
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      name: 'Test User',
      username: 'testuser',
      password: hashedPassword,
      email: 'test@example.com'
    });

    await user.save();
    console.log("Test user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating test user:", error);
    process.exit(1);
  }
}

createTestUser();