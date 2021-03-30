import express from 'express'
import * as postCommentControllers from '../controllers/postCommentControllers.js'
import { checkAuth } from '../middleware/checkAuth.js'
const postCommentRoutes = express.Router()

postCommentRoutes.post('/createPostComment', checkAuth, postCommentControllers.createPostComment)
postCommentRoutes.delete('/deletePostComment', checkAuth, postCommentControllers.deletePostComment)

export { postCommentRoutes }