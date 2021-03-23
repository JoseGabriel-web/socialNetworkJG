import express from 'express'
import * as postCommentControllers from '../controllers/postCommentControllers.js'
import { auth } from '../middleware/auth.js'
const postCommentRoutes = express.Router()

postCommentRoutes.post('/createPostComment', auth, postCommentControllers.createPostComment)
postCommentRoutes.delete('/deletePostComment', auth, postCommentControllers.deletePostComment)

export { postCommentRoutes }