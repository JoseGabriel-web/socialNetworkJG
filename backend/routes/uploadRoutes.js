import express from 'express'
import { uploadPost } from '../utils/upload.js'
const uploadRoutes = express.Router()

uploadRoutes.post('/post', uploadPost.single('image'), async (req, res) => {
  console.log('This is the Image -> ',req.file)  
  const url = await req.file.path
  res.send(url)
})

uploadRoutes.post('/user/profilePicture', uploadPost.single('image'), async (req, res) => {   
  const url = await req.file.path
  res.send(url)
})

export { uploadRoutes }
