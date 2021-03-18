import mongoose from 'mongoose'

const chatRoomSchema = mongoose.Schema({
  users: [{ type: String, required: true }],    
  createdDate: { type: Date, default: Date.now }        
})

export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)