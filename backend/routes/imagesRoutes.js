import express from 'express'
import { uploadPost, uploadProfilePicture } from '../utils/cloudinary/upload.js'
const imagesRoutes = express.Router()

// Uploads Routes
imagesRoutes.post('/upload/post', uploadPost.single('image'), async (req, res) => {
  console.log('This is the Image -> -> -> -> ', req.file)  
  const url = await req.file.path
  const public_id = await req.file.filename
  res.json({url, public_id})
})

imagesRoutes.post('/upload/user', uploadProfilePicture.single('image'), async (req, res) => {   
  const url = await req.file.path
  const public_id = await req.file.filename
  res.json({url, public_id})
})

export { imagesRoutes }
