import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from './cloudinary.js'
import multer from 'multer'

const postImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', 'jpeg'],
    folder: 'socialnetworkjg/posts',    
    use_filename: true,
    unique_filename: true
  }
})

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', 'jpeg'],
    folder: 'socialnetworkjg/profile_pictures',
    use_filename: true,
    unique_filename: true
  }
})

export const profileImg = multer({ storage: profileStorage }).single('image')
export const postImg = multer({ storage: postImageStorage }).single('image')
