import express from 'express'
import { getProfile } from '../controllers/profileControllers.js'
const profileRoutes = express.Router()


profileRoutes.get('/getProfile/:username', getProfile)


export { profileRoutes }