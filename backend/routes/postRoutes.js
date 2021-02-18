import express from 'express'
import { auth } from '../middleware/auth.js'
import { createPost, getPosts, deletePost, likePost } from '../controllers/postControllers.js'
import { postImg } from '../utils/cloudinary/upload.js'
import { deletePostImg } from '../utils/cloudinary/delete.js'
const postRoutes = express.Router()

// Post Routes
postRoutes.post('/createPost', postImg,  auth, createPost)
postRoutes.post('/likePost', auth, likePost)
postRoutes.delete('/deletePost', auth, deletePostImg, deletePost)
postRoutes.get('/getPosts', getPosts)


export { postRoutes }