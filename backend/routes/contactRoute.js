import express from "express"
import { getContacts, addContacts } from "../controllers/contactController.js"
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Define the GET route to VIEW a existing Contact entry
router.get('/', authenticate, getContacts)

// Define the POST route to CREATE a new Contact entry
router.post('/', addContacts)


export default router