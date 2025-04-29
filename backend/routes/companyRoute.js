import express from "express"
import { addCompanyContent, getCompanyContent, updateCompanyContent } from "../controllers/companyController.js"
import { authenticate } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Get Company Content
router.get('/', getCompanyContent)

// Add Company Content - ADMIN ONLY
router.post('/', authenticate, upload.single('logo'), addCompanyContent)

// Update Company Content - ADMIN ONLY
router.put('/', authenticate, upload.single('logo'), updateCompanyContent)

export default router