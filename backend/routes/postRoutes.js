import express from 'express'
import { auth } from '../middleware/auth.js'
import { createPost, getPosts } from '../controllers/postControllers.js'
const postRoutes = express.Router()

// Post Routes
postRoutes.post('/createPost', auth, createPost)
postRoutes.get('/getPosts', getPosts)

export { postRoutes }