import express from 'express'
import { auth } from '../middleware/auth.js'
import * as postControllers from '../controllers/postControllers.js'
import { postImg } from '../utils/cloudinary/upload.js'
import { deletePostImg } from '../utils/cloudinary/delete.js'
const postRoutes = express.Router()

// Post Routes
postRoutes.post('/createPost', postImg,  auth, postControllers.createPost)
postRoutes.post('/likePost', auth, postControllers.likePost)
postRoutes.delete('/deletePost', auth, deletePostImg, postControllers.deletePost)
postRoutes.get('/getPosts', postControllers.getPosts)


export { postRoutes }