import jwt from 'jsonwebtoken'
const { ACCESS_TOKEN_SECRET } = process.env

export const checkAuth = (req,res,next) => {
  const token = req.headers.authorization.split(' ')[1]
  if(!token) {
    next(new Error('Token Missing'))
  } else {
      try {
      const { user } = jwt.verify(token, ACCESS_TOKEN_SECRET)
      req.user = user
      next()
      } catch(error) {
        if(error.name === 'TokenExpiredError') {
          next(new Error('Session timed out, please login again'))
        } else if(error.name === 'JsonWebTokenError') {
          next(new Error('Invalid token, please login again'))
        } else {
          next(error)
        }
      }
  }
}