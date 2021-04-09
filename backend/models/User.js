import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { RefreshToken } from './RefreshToken.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const notificationSchema = mongoose.Schema({
  from: { type: String },
  body: { type: String },  
  link: { type: String },  
  type: { type: String },
  createdAt: {type: Date, default: Date.now},
})

const userSchema = mongoose.Schema({
  name: {type: String, lowercase: true, required: true, unique: true},  
  email: {type: String, lowercase: true, required: true, unique: true}, 
  password: {type: String, required: true},  
  notifications: [notificationSchema],  
  profilePicture: {
    url: { type: String, default: null },
    public_id: { type: String },
  },    
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

// const userSchema = mongoose.Schema({
//   name: {type: String, lowercase: true, required: true, unique: true},  
//   email: {type: String, lowercase: true, required: true, unique: true}, 
//   password: {type: String, required: true},  
//   notifications: [notificationSchema],
//   followers: [{ type: String, required: true }],
//   following: [{ type: String, required: true }],  
//   profilePicture: {
//     url: { type: String, default: null },
//     public_id: { type: String },
//   },    
//   createdAt: {type: Date, default: Date.now},
//   updatedAt: {type: Date, default: Date.now}
// })

userSchema.methods = {
  createAccessToken: async function() {
    let { _id, name } = this
    try {
      const accessToken = jwt.sign({ user: { _id, name } }, ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
      })
      return accessToken
    } catch(error) {
      console.error(error)
      return
    }
  },

  createRefreshToken: async function() {
    let { _id, name } = this
    try {
      let refreshToken = jwt.sign({ user: { _id, name } }, REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
      })

      await new RefreshToken({ refreshToken }).save()
      return refreshToken
    } catch(error) {
      console.error(error)
      return
    }
  }
}

userSchema.pre('save', async function() {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 14)  
  } 
  return
})

export const User = mongoose.model('User', userSchema)