import express from "express"
import { getArticles, addArticle, deleteArticle } from "../controllers/articleController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Define the GET route to VIEW a existing Article
router.get('/', getArticles)

// Define the POST route to CREATE a new Article
router.post('/', authenticate, addArticle)

// Define the POST route to DELETE an Article
router.delete('/:id', authenticate, deleteArticle)


export default router