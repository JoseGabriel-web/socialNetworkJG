import jwt from 'jsonwebtoken'

export const auth = (req,res,next) => {
  const authorization = req.headers.authorization
  if(!authorization) return res.status(400).json({message: 'No token'})

  try {
    const token = authorization.split(' ')[1]
    const userDecoded = jwt.verify(token, process.env.JWT_SECRET)
    const { _id } = userDecoded
    req.body.userId = _id
    next()
  } catch (error) {
    res.status(400).json({message: 'Token Expired'})    
  }
}