import express from 'express'
import { createPost } from '../controllers/postControllers.js'
const postRoutes = express.Router()

// Post Routes
postRoutes.post('/createPost', createPost)

export { postRoutes }