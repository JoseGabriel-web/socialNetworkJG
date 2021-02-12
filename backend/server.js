import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { userRoutes } from './routes/userRoutes.js'
// Remove this line below
import { User } from './models/User.js'
import { postRoutes } from './routes/postRoutes.js'
import { uploadRoutes } from './routes/uploadRoutes.js'
import { auth } from './middleware/auth.js'
dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/post', auth, postRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Remove this line below
app.use('/api/users', async (req,res) => {
  const users = await User.find({})
  res.json(users)
})

app.get('/', (req,res) => {
  res.send('Up an running')
})


const PORT = 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))