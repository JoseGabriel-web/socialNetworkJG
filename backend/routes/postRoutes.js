import express from 'express'
import { auth } from '../middleware/auth.js'
import { createPost, getPosts, deletePost } from '../controllers/postControllers.js'
import { deletePostImg } from '../utils/cloudinary/delete.js'
const postRoutes = express.Router()

// Post Routes
postRoutes.post('/createPost', auth, createPost)
postRoutes.delete('/deletePost', auth, deletePostImg, deletePost)
postRoutes.get('/getPosts', getPosts)

export { postRoutes }