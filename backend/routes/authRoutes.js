import express from 'express'
import { checkAuth } from '../middleware/checkAuth.js'
import * as authControllers from '../controllers/authControllers.js'

const authRoutes = express.Router()

authRoutes.post('/register', authControllers.register)
authRoutes.post('/login', authControllers.login)
authRoutes.post('/refreshToken', authControllers.generateAccessToken)
authRoutes.delete('/logout', authControllers.logout)

export { authRoutes }