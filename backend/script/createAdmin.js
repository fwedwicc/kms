import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/userModel.js' // Adjust the path based on your project structure

dotenv.config() // Load environment variables

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const existingAdmin = await User.findOne({ username: 'admin' })

    if (existingAdmin) {
      console.log('Admin user already exists.')
    } else {
      const admin = new User({
        username: 'admin',
        password: 'admin123', // Change this to a strong password
      })

      await admin.save()
      console.log('Admin user created successfully.')
    }

    mongoose.connection.close()
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

createAdmin()
