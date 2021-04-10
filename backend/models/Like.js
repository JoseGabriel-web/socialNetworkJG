import mongoose from 'mongoose'

const likeSchema = mongoose.Schema({
  name: {type: String, required: true},  
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
})

export const Like = mongoose.model('Like', likeSchema)