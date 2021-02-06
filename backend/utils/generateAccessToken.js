import jwt from 'jsonwebtoken'

export const generateAccessToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '10m' })
}