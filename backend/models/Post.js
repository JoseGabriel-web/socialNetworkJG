import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user: {
    name: { type: String, default: null },
    profilePicture: { type: String, default: null },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },  
  likes: [{type: String, required: true}],  
  comments: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Post = mongoose.model('POST', postSchema)