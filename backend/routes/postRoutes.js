import express from 'express'
import { checkAuth } from '../middleware/checkAuth.js'
import * as postControllers from '../controllers/postControllers.js'
import { postImg } from '../utils/cloudinary/upload.js'
import { deletePostImg } from '../utils/cloudinary/delete.js'
const postRoutes = express.Router()

// Post Routes
postRoutes.post('/createPost', postImg,  checkAuth, postControllers.createPost)
postRoutes.post('/likePost', checkAuth, postControllers.likePost)
postRoutes.delete('/deletePost', checkAuth, deletePostImg, postControllers.deletePost)
postRoutes.get('/getPosts', postControllers.getPosts)


export { postRoutes }