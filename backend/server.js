import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import * as http from 'http'
import { Server } from 'socket.io'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'
import { userRoutes } from './routes/userRoutes.js'
import { postRoutes } from './routes/postRoutes.js'
import { profileRoutes } from './routes/profileRoutes.js'
import { followerRoutes } from './routes/followerRoutes.js'
import { postCommentRoutes } from './routes/postCommentRoutes.js'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {}) 
dotenv.config()
connectDB()

io.on('connection', (socket) => {
  console.log('User connected')  
  
  socket.on('disconnect', () => console.log('User disconnected'))
})

app.use(express.json())
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/post/comment', postCommentRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/followers', followerRoutes)
app.use(errorMiddleware)

app.get('/', (req,res) => res.send('asdasd'))

const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
