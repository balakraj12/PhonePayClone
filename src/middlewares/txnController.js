const Transaction = require('../models/Transaction');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Send money via Phone Number OR UPI ID
// @route   POST /api/transactions/send
// @access  Private

const sendMoney = async (req, res) => {
  try {
    const { receiverIdentifier, amount, mpin } = req.body; // identifier can be Phone OR UPI ID
    const senderId = req.user._id;
