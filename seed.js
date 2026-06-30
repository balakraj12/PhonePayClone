require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Transaction = require('./src/models/Transaction');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected for Seeding...');

    await User.deleteMany();
    await Transaction.deleteMany();
    console.log('Existing users & transactions deleted.');

     // Default password and mpin
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);