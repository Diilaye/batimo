import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../server/models/Admin.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: 'majority'
    });

    console.log('Successfully connected to MongoDB Atlas');
    
    const adminExists = await Admin.findOne({ email: 'diikaanedev@batimo.com' });
    if (adminExists) {
      console.log('Admin account already exists');
      await mongoose.connection.close();
      return;
    }

    const admin = new Admin({
      email: 'diikaanedev@batimo.com',
      password: 'passer123'
    });

    await admin.save();
    console.log('Admin account created successfully');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (err) {
      console.error('Error closing MongoDB connection:', err.message);
    }
    process.exit(0);
  }
};

createAdmin();