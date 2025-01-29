import express from 'express';
import protect from '../middlewares/authMiddleware.js'; // Adjust the path

const router = express.Router();

// @desc    Admin dashboard
// @route   GET /api/admin
// @access  Private
router.get('/admin', protect, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

export default router;