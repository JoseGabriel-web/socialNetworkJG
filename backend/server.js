import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import * as http from 'http'
import { Server } from 'socket.io'
import { connectDB } from './config/db.js'
import { userRoutes } from './routes/userRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { postRoutes } from './routes/postRoutes.js'
import { profileRoutes } from './routes/profileRoutes.js'
import { chatRoomRoutes } from './routes/chatRoomRoutes.js'
import { followerRoutes } from './routes/followerRoutes.js'
import { postCommentRoutes } from './routes/postCommentRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import * as socketControllers from './socketControllers/index.js'
const app = express()
const server = http.createServer(app)
const io = new Server(server) 
dotenv.config()
connectDB()

io.on('connection', (socket) => {  
  socketControllers.onlineUsersController(io, socket)
  socketControllers.chatControllers(io, socket)  
})

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/chatRoom', chatRoomRoutes)
app.use('/api/post/comment', postCommentRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/followers', followerRoutes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 4000
server.listen(PORT)