import express from "express"
import { addHeroContent, getHeroContent, updateHeroContent } from "../controllers/heroController.js"
import { authenticate } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Get Hero Content
router.get('/', getHeroContent)

// Update Hero Content - ADMIN ONLY
router.put('/', authenticate, upload.single('illustration'), updateHeroContent)

// Add Hero Content - ADMIN ONLY
router.post('/', authenticate, upload.single('illustration'), addHeroContent)

export default router