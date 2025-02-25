import express from "express"
import { getFAQs, addFAQs, updateFAQs, deleteFAQs } from "../controllers/faqsController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Get all FAQs
router.get('/', getFAQs)

// Create a new FAQ - ADMIN ONLY
router.post('/', authenticate, addFAQs)

// Edit an existing FAQ - ADMIN ONLY
router.put('/:id', authenticate, updateFAQs)

// Delete an FAQ - ADMIN ONLY
router.delete('/:id', authenticate, deleteFAQs)

export default router