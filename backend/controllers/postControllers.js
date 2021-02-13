import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const createPost = async (req, res) => {
  const { _id, title, description, image } = req.body
  console.log('This comes from /backend / postControllers',_id)
  const user = await User.findById({ _id: _id })
  const post = await Post.create({
    user: { _id: user._id, username: user.name },
    title,
    description,
    image,
  })

  res.status(200).json({ post })
}

export const getPosts = async (req, res) => {
  const posts = await Post.find({})
  console.log(posts)  
  res.status(200).json({ posts })
}
