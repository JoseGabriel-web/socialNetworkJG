import { User } from '../models/User.js'
import express from 'express'
import * as followerControlers from '../controllers/followerControlers.js'
const followerRoutes = express.Router()

followerRoutes.get('/getFollowers/:username', followerControlers.getFollowers)
followerRoutes.put('/follow', followerControlers.follow)
followerRoutes.delete('/unfollow', followerControlers.unfollow)

export { followerRoutes }