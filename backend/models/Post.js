import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  label: { type: String, required: true },
  user: {    
    name: { type: String, required: true },
    profilePicture: { type: String, default: null },    
  },  
  likes: [{type: String}],
  createdAt: { type: Date, default: Date.now },
})

const postSchema = mongoose.Schema({
  user: {    
    name: { type: String, required: true },
    profilePicture: { type: String, default: null },
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