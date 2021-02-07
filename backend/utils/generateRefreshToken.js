import jwt from 'jsonwebtoken'


export const generateRefreshToken = (_id) => {
  return jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  })
}