import { User } from '../models/User.js'
import express from 'express'
import { follow, unfollow, getFollowers } from '../controllers/followerControlers.js'
const followerRoutes = express.Router()

followerRoutes.get('/getFollowers/:username', getFollowers)
followerRoutes.post('/follow', follow)
followerRoutes.delete('/unfollow', unfollow)

export { followerRoutes }