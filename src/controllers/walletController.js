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

     // Log addition transaction
    const transaction = await Transaction.create({
      sender: userId,
      type: 'ADD_MONEY',
      amount,
      status: 'SUCCESS',
    });

    res.json({ message: `Successfully added ${amount} to wallet`, balance: user.balance, transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay Utility Bills (Recharge, Electricity)
// @route   POST /api/wallet/pay-bill
// @access  Private

const payBill = async (req, res) => {
  try {
    const { billerName, amount, mpin } = req.body;
    const userId = req.user._id;

    if (!mpin) {
        return res.status(400).json({ message: 'MPIN is required' });
    }