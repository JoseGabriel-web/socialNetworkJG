// chatRoomRoutes.js
import express from 'express'
import * as chatRoomControllers from '../controllers/chatRoomControllers.js'
const chatRoomRoutes = express.Router()

chatRoomRoutes.post('/getChatRoom', chatRoomControllers.getChatRoom)

export { chatRoomRoutes }