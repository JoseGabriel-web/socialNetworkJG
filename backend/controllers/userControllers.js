import { User } from '../models/User.js'
import { generateAccessToken } from '../utils/generateAccessToken.js'
import { generateRefreshToken } from '../utils/generateRefreshToken.js'
import bcrypt from 'bcryptjs'

export const register = async (req,res) => {
  const { name, email, password } = req.body
  const userExist = await User.findOne({ email })
  if(userExist) return res.status(400).json({message: 'User already exists.'})
  const user = await User.create({
    name,
    email,
    password
  })    

  res.status(200).json({
    name: user.name,
    email: user.email,
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id)
  })
}

export const login = async (req,res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user) return res.status(400).json({message: 'No user with email'})
  const match = await bcrypt.compare(password, user.password)
  if(!match) return res.status(400).json({message: 'Incorrect password'})

  res.status(200).json({
    name: user.name,
    email: user.email,
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id)
  })
}

