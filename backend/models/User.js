import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {type: String, required: true},  
  email: {type: String, required: true, unique: true}, 
  profilePicture: {
    url: { type: String, required: true, default: '' },
    public_id: { type: String, required: true },
  },  
  savedPosts: [{type: mongoose.SchemaTypes.ObjectId}],
  followers: [{type: mongoose.SchemaTypes.ObjectId}],
  password: {type: String, required: true},    
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

userSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 14)  
})

export const User = mongoose.model('User', userSchema)