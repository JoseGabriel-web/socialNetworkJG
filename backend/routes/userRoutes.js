import express from 'express'
import * as userControllers from '../controllers/userControllers.js'
import { auth } from '../middleware/auth.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { profileImg } from '../utils/cloudinary/upload.js'
const userRoutes = express.Router()

// User routes
userRoutes.post('/updateUser', checkAuth, userControllers.updateUser)
userRoutes.get('/getUserInfo', checkAuth, userControllers.getUserInfo)
userRoutes.post('/updateProfilePicture', profileImg, checkAuth, userControllers.updateProfilePicture)

export { userRoutes }