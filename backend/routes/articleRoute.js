import express from "express"
import { getArticles, getCurrentArticle, addArticle, deleteArticle } from "../controllers/articleController.js"
import { authenticate } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

const router = express.Router()

// Define the GET route to VIEW a existing Article
router.get('/', getArticles)

// Get the current Article
router.get('/:id', getCurrentArticle)

// Define the POST route to CREATE a new Article
router.post('/', authenticate, upload.single('image'), addArticle)

// Define the POST route to DELETE an Article
router.delete('/:id', authenticate, deleteArticle)


export default router