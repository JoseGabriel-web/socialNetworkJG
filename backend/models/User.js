import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const notificationSchema = mongoose.Schema({
  label: {type: String, required: true}  
})

const userSchema = mongoose.Schema({
  name: {type: String, lowercase: true, required: true, unique: true},  
  email: {type: String, lowercase: true, required: true, unique: true}, 
  profilePicture: {
    url: { type: String, default: null },
    public_id: { type: String },
  },  
  notifications: [notificationSchema],  
  followers: [{ type: String, required: true }],
  following: [{ type: String, required: true }],
  password: {type: String, required: true},    
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

userSchema.pre('save', async function() {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 14)  
  } 
  return
})

export const User = mongoose.model('User', userSchema)