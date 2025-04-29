import express from "express"
import { getContactInfo, updateContactInfo } from "../controllers/contactInfoController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Get Contact Info
router.get('/', getContactInfo)

// Update Contact Info - ADMIN ONLY
router.put('/', authenticate, updateContactInfo)

export default router