const express = require('express');
const router = express.Router();
const { sendMoney, getTransactionHistory } = require('../controllers/txnController');
const { protect } = require('../middlewares/authMiddleware');