import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Login Controller
export const login = async (req, res) => {

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try {
    const existingAdmin = await User.findOne({ username })

    // Check if the user exists
    if (!existingAdmin) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    await existingAdmin.save()

    // Generate token
    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, { expiresIn: '2h' })

    res.status(200).json({ message: 'Login successful', result: existingAdmin, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Logout Controller
export const logout = async (req, res) => {
  try {
    // Optionally, you can blacklist the token here (if needed)
    // For now, we'll just send a success response
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};