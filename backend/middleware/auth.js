import jwt from 'jsonwebtoken'
const { ACCESS_TOKEN_SECRET } = process.env

export const auth = (req,res,next) => {
  const authorization = req.headers.authorization
  if(!authorization) next(new Error("No token"))

  try {
    const accessToken = authorization.split(' ')[1]
    const userDecoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
    const { _id } = userDecoded
    console.log('Auth _id ->',_id)
    req.body._id = _id        
    next()
  } catch (error) {    
    next(new Error("Token expired"))
  }
}

