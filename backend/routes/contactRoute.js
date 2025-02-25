import express from "express"
import { getContacts, addContacts } from "../controllers/contactController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Get all Contacts - ADMIN ONLY
router.get('/', authenticate, getContacts)

// Submit a contact
router.post('/', addContacts)


export default router