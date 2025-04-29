import express from 'express'
import { connect } from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import faqsRoutes from './routes/faqsRoute.js'
import contactRoutes from './routes/contactRoute.js'
import authRoutes from './routes/authRoute.js'
import articleRoutes from './routes/articleRoute.js'
import companyRoutes from './routes/companyRoute.js'
import contactInfoRoutes from './routes/contactInfoRoute.js'

dotenv.config()

const app = express()

app.use(cors())

// Middleware to parse JSON
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.use("/api/faqs", faqsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/article", articleRoutes)
app.use("/api/company", companyRoutes)
app.use("/api/contactInfo", contactInfoRoutes)
app.use('/uploads', express.static('uploads'))

// MongoDB and Port connection
connect(process.env.MONGO_URI)
  .then(() => {

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT} and connected to MongoDB`)
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB: ', err.message)
  })