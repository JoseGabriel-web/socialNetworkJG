import jwt from 'jsonwebtoken'

export const auth = (req,res,next) => {
  const authorization = req.headers.authorization
  if(!authorization) throw new Error("No token")

  try {
    const token = authorization.split(' ')[1]
    const userDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { _id } = userDecoded
    console.log('Auth _id ->',_id)
    req.body._id = _id        
    next()
  } catch (error) {    
    throw new Error("Token expired")       
  }
}