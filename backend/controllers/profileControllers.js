import { User } from '../models/User.js'
import { Post } from '../models/Post.js'

export const getProfile = async (req,res) => {
  let name = req.params.username   
  name = name.split('+').join(' ')
  try {
    const user = await User.findOne({ name })        
    const posts = await Post.find({ 'user.name': name })        
    const profile = {
      user: {
        name: user.name,
        email: user.email,        
        followers: user.followers,
        following: user.following,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
      posts
    }    
    res.status(200).json({profile})  
  } catch(error) {
    res.status(404).json({error: 'User Not Found'})
  }
}