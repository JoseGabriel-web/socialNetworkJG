import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {type: String, required: true},  
  email: {type: String, required: true, unique: true},  
  password: {type: String, required: true},    
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 14)  
})

export const User = mongoose.model('User', userSchema)