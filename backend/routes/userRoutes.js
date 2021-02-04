import express from 'express'
import { register, login } from '../controllers/userControllers.js'
const userRoutes = express.Router()

// User routes
userRoutes.post('/register', register)
userRoutes.post('/login', login)

export { userRoutes }