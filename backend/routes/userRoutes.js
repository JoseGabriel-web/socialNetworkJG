import express from 'express'
import { register, login, updateUser, updateProfilePicture } from '../controllers/userControllers.js'
import { auth } from '../middleware/auth.js'
import { profileImg } from '../utils/cloudinary/upload.js'
const userRoutes = express.Router()

// User routes
userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/updateUser', auth, updateUser)
userRoutes.post('/updateProfilePicture', profileImg, auth, updateProfilePicture)

export { userRoutes }