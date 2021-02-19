import { User } from '../models/User.js'
import { Post } from '../models/Post.js'

export const getProfile = async (req,res) => {
  const name = req.params.username  
  const user = await User.findOne({ name })
  const posts = await Post.find({user: { _id: user._id, username: name}})    
  const profile = {
    user: {
      name: user.name,
      email: user.email,
      savedPosts: user.savedPosts,
      createdAt: user.createdAt,
    },
    posts,    
  }

  res.status(200).json({profile})  
}