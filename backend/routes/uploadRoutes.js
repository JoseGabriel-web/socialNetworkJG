import path from 'path'
import multer from 'multer'
import express from 'express'

const uploadRoutes = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {    
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname))
  const mimetype = fileTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

uploadRoutes.post('/', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.send(`/${req.file.path}`)
})

export { uploadRoutes }
