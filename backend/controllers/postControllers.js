import {Post} from '../models/Post.js'
import { User } from '../models/User.js'

export const createPost = async (req,res) => {
  const { _id, title, description, image } = req.body  
  console.log(_id)
  const user = await User.findById({_id: _id})
  const post = await Post.create({
    user: { _id: user._id, username: user.name },
    title,
    description,
    image,
  })

  res.status(200).json({post})
}