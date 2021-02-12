import jwt from 'jsonwebtoken'

export const auth = (req,res,next) => {
  const authorization = req.headers.authorization
  if(!authorization) return res.status(400).json({message: 'No token'})

  try {
    const token = authorization.split(' ')[1]
    const userDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { _id } = userDecoded
    req.body._id = _id    
    console.log(userDecoded)
    next()
  } catch (error) {
    console.log("Token Expired")
    res.status(400).json({message: 'Token Expired'})    
  }
}