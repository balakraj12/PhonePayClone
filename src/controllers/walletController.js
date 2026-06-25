const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');

// @desc    Add mock money to wallet from linked bank
// @route   POST /api/wallet/add-money
// @access  Private

const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount should be valid' });
    }

     const user = await User.findById(userId);
    user.balance += amount;
    await user.save();