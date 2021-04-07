import express from 'express'
import * as commentControllers from '../controllers/commentControllers.js'
import { checkAuth } from '../middleware/checkAuth.js'
const commentRoutes = express.Router()

commentRoutes.post('/createPostComment', checkAuth, commentControllers.createComment)
commentRoutes.delete('/deletePostComment', checkAuth, commentControllers.deletePostComment)

export { commentRoutes }