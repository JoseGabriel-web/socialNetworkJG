import { User } from '../models/User.js'
import { RefreshToken } from '../models/RefreshToken.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const { ACCESS_TOKEN_SECRET } = process.env
const { REFRESH_TOKEN_SECRET } = process.env

export const register = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({ name, email, password })
    const accessToken = await user.createAccessToken()
    const refreshToken = await user.createRefreshToken()
    return res.status(201).json({ accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(new Error('No user found'))
    } else {
      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const accessToken = await user.createAccessToken()
        const refreshToken = await user.createRefreshToken()
        return res.status(201).json({ accessToken, refreshToken })
      } else {
        return next(new Error('Invalid password'))
      }
    }
  } catch (error) {
    console.error(error)
    return next(new Error('Internal server error!'))
  }
}

export const generateAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if(!refreshToken) {
      return next(new Error('Access denied, token missing!'))
    } else {
      const refreshTokenDoc = await RefreshToken.findOne({ refreshToken })
      if(!refreshTokenDoc) {
        return next(new Error('Token Expired!'))
      } else {               
        const { user } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)        
        const accessToken = await jwt.sign({ user }, ACCESS_TOKEN_SECRET, {
          expiresIn: '1m'
        })
        return res.status(201).json({ accessToken })
      }
    }
  } catch(error) {
    console.error(error)
    return next(new Error('Internal Server error!'))
  }
}

export const logout = async (req,res,next) => {
  try {
    const { refreshToken } = req.query
    console.log(refreshToken)
    await RefreshToken.findOneAndDelete({ refreshToken })
    return res.status(201).json({ message: 'User Logged out' })
  } catch(error) {
    console.error(error)
    return next(new Error('Internal Server Error!'))
  }
}