import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js'
import faqsRoutes from './routes/faqsRoute.js'
import contactRoutes from './routes/contactRoute.js'
import authRoutes from './routes/authRoute.js'
import articleRoutes from './routes/articleRoute.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.use("/api/faqs", faqsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/article", articleRoutes)

app.listen(port, () => {
  connectDB()
  console.log(`Server is running on port http://localhost:${port}`)
})