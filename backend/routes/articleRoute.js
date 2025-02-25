import express from "express"
import { getArticles, getCurrentArticle, addArticle, updateArticle, deleteArticle } from "../controllers/articleController.js"
import { authenticate } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Get all articles
router.get('/', getArticles)

// Get the current article
router.get('/:id', getCurrentArticle)

// Create a new Article - ADMIN ONLY
router.post('/', authenticate, upload.single('image'), addArticle)

// Update an article - ADMIN ONLY
router.put('/:id', authenticate, upload.single('image'), updateArticle)

// Delete an Article - ADMIN ONLY
router.delete('/:id', authenticate, deleteArticle)


export default router