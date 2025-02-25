import express from "express"
import { login, logout } from "../controllers/authController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', authenticate, logout)

export default router