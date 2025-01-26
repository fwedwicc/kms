import express from "express"
import { getFAQs, addFAQs, updateFAQs, deleteFAQs } from "../controllers/faqsController.js"

const router = express.Router()

// Define the GET route to VIEW a existing FAQs entry
router.get('/', getFAQs)

// Define the POST route to CREATE a new FAQs entry
router.post('/', addFAQs)

// Define the PUT route to UPDATE an existing FAQ entry
router.put('/:id', updateFAQs)

// Define the DELETE route to DELETE an existing FAQ entry
router.delete('/:id', deleteFAQs)

export default router