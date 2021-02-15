import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  user: {
    _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    username: { type: String, required: true },
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const postSchema = mongoose.Schema({
  user: {
    _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    username: { type: String, required: true },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  likes: [{type: String, required: true}],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Post = mongoose.model('POST', postSchema)