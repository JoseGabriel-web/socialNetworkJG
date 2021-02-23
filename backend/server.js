import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { userRoutes } from './routes/userRoutes.js'
import { postRoutes } from './routes/postRoutes.js'
import { profileRoutes } from './routes/profileRoutes.js'
import { followerRoutes } from './routes/followerRoutes.js'
const app = express()
dotenv.config()
connectDB()


app.use(express.json())
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/followers', followerRoutes)

// Remove this line below
import { User } from './models/User.js'
app.use('/api/users', async (req,res) => {
  const users = await User.find({})
  res.json(users)
})

app.get('/', (req,res) => {
  res.send('Up an running')
})


const PORT = 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))