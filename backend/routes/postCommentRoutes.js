import express from 'express'
import { createPostComment, deletePostComment } from '../controllers/postCommentControllers.js'
import { auth } from '../middleware/auth.js'
const postCommentRoutes = express.Router()

postCommentRoutes.post('/createPostComment', auth, createPostComment)
postCommentRoutes.delete('/deletePostComment', auth, deletePostComment)

export { postCommentRoutes }