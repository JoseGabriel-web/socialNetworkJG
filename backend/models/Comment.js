import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  label: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user: {
    name: { type: String, default: null },
    profilePicture: { type: String, default: null },
  }, 
  likes: [{type: String}],
  createdAt: { type: Date, default: Date.now },
})

const commentSectionSchema = mongoose.Schema({
  postId: { type: mongoose.Types.ObjectId },
  comments: [commentSchema]
})

export const Comment = mongoose.model('Comment', commentSchema)