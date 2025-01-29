import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cors from 'cors'
import connectDB from './db.js'
import faqsRoutes from './routes/faqsRoute.js'
import contactRoutes from './routes/contactRoute.js'
import userRoutes from './routes/userRoute.js'; // Adjust the path
import adminRoutes from './routes/adminRoute.js'; // Adjust the path

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.use('/api', adminRoutes)
app.use("/api/faqs", faqsRoutes)
app.use("/api/contact", contactRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  connectDB()
  console.log(`Server is running on port http://localhost:${port}`)
})