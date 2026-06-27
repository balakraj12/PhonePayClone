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

     if (!mpin) {
      return res.status(400).json({ message: 'MPIN is required for transactions' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const sender = await User.findById(senderId);

    // Verify MPIN
    if (!sender.mpin) {
      return res.status(400).json({ message: 'Please setup your MPIN first' });
    }
    const isMpinCorrect = await bcrypt.compare(mpin.toString(), sender.mpin);
    if (!isMpinCorrect) {
      return res.status(401).json({ message: 'Incorrect MPIN' });
    }

    // Find the receiver either by Phone or UPI ID
    const receiver = await User.findOne({
      $or: [{ phone: receiverIdentifier }, { upiId: receiverIdentifier }]
    });

     if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found (Invalid Phone/UPI)' });
    }
