import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import connectDB from './db.js'
import faqsRoutes from './routes/faqsRoute.js'

dotenv.config()

const app = express()
const port = process.env.PORT

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.use("/api/faqs", faqsRoutes)

app.listen(port, () => {
  connectDB()
  console.log(`Server is running on port http://localhost:${port}`)
})