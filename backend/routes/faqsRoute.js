import express from "express"
import { getFAQs, addFAQs, updateFAQs, deleteFAQs } from "../controllers/faqsController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Define the GET route to VIEW a existing FAQs entry
router.get('/', getFAQs)

// Define the POST route to CREATE a new FAQs entry
router.post('admin/', addFAQs, authenticate)

// Define the PUT route to UPDATE an existing FAQ entry
router.put('admin/:id', updateFAQs, authenticate)

// Define the DELETE route to DELETE an existing FAQ entry
router.delete('admin/:id', deleteFAQs, authenticate)

export default router