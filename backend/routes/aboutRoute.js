import express from "express"
import { getAboutContent, addAboutContent } from "../controllers/aboutController.js"
import { authenticate } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Get About Content
router.get('/', getAboutContent)

// Add About Content - ADMIN ONLY
router.post('/', authenticate, upload.single('illustration'), addAboutContent)

// Update About Content - ADMIN ONLY
// router.put('/', authenticate, upload.single('logo'), updateCompanyContent)

export default router