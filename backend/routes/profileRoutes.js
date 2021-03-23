import express from 'express'
import * as profileControllers from '../controllers/profileControllers.js'
const profileRoutes = express.Router()


profileRoutes.get('/getProfile/:username', profileControllers.getProfile)


export { profileRoutes }