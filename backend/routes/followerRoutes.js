import express from 'express'
import { checkAuth } from '../middleware/checkAuth.js'
import * as followerControlers from '../controllers/followerControlers.js'
const followerRoutes = express.Router()

followerRoutes.get('/getFollowersInfo', checkAuth, followerControlers.getFollowersInfo)
followerRoutes.put('/follow', checkAuth, followerControlers.follow)
followerRoutes.delete('/unfollow', checkAuth, followerControlers.unfollow)

export { followerRoutes }