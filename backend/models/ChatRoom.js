import mongoose from 'mongoose'

const userSchema = mongoose.Schema({ 
  name: { type: String, required: true }, 
  userId: { type: mongoose.Types.ObjectId, required: true } 
})

const chatRoomSchema = mongoose.Schema({
  users: [userSchema],
  createdDate: { type: Date, default: Date.now }        
})

export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)