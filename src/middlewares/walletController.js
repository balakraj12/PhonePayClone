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