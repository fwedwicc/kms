import express from "express"
import { getArticles, addArticle } from "../controllers/articleController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Define the GET route to VIEW a existing Contact entry
router.get('/', getArticles)

// Define the POST route to CREATE a new Contact entry
router.post('/', authenticate, addArticle)


export default router