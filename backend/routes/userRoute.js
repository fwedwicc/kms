import express from 'express';
import User from '../models/userModel.js'; // Adjust the path
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      _id: user._id,
      username: user.username,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;