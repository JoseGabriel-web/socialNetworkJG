import jwt from 'jsonwebtoken'

export const generateToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET)
}