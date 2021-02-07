import jwt from 'jsonwebtoken'

export const generateAccessToken = (_id) => {
  return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}