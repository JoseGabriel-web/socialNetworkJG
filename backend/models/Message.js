import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  chatRoomId: { type: mongoose.Types.ObjectId },
  creator: { type: mongoose.Types.ObjectId },
  sender: { type: String },
  body: { type: String },
  createdDate: { type: Date, default: Date.now }  
})

export const Message = mongoose.model('Message', messageSchema)