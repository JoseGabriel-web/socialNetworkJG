import { v2 } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import multer from 'multer'

const cloudinary = v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', 'jpeg'],
    folder: 'socialnetworkjg/posts',
  }
})
const profilePicturesStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', 'jpeg'],
    folder: 'socialnetworkjg/profile_pictures',
  }
})

const uploadPost = multer({ storage: postStorage })
const uploadProfilePicture = multer({ storage: profilePicturesStorage })

export { uploadPost, uploadProfilePicture }