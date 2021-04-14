import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema({
  from: { type: mongoose.Types.ObjectId, required: true },
  to: { type: mongoose.Types.ObjectId, required: true },
  body: { type: String },  
  link: { type: String },  
  type: { type: String, required: true },
  createdAt: {type: Date, default: Date.now},
})

export const Notification = mongoose.model('Notification', notificationSchema)