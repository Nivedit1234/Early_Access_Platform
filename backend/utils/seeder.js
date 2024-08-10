//import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import users from '../data/users.js';
import connectDB from '../config/db.js';
dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    console.log('Users Imported');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
