const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Format is "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];
// Decode the token and get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

       // Find user in database, exclude password
      req.user = await User.findById(decoded.id).select('-password');