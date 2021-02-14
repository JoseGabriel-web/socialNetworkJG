import cloudinary from './cloudinary.js'

export const deletePostImg = (req, res, next) => {
  const { public_id } = req.query  
  console.log('This are the params', req.query)
    
  cloudinary.uploader.destroy(public_id, {
    resource_type: 'image',
    invalidate: true
  }, (error, result) => {
    if(error) throw new Error(error)
    console.log(result)
    next()
  })
}

export const deleteUserProfilePic = async (req, res, next) => {
  const { public_id } = req.query  
  console.log('This are the params', req.query)
    
  cloudinary.uploader.destroy(public_id, {
    resource_type: 'image',
    invalidate: true
  }, (error, result) => {
    if(error) throw new Error(error)
    console.log(result)
    next()
  })
}