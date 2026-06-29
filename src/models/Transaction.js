const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
     receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional now because we might have BILL_PAY or WITHDRAW where receiver is not a user
    },