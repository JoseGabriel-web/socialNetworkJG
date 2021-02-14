import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const createPost = async (req, res) => {
  const { _id, title, description, image } = req.body
  console.log('This comes from /backend / postControllers', image)
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

export const deletePost = async (req,res) => {
  const { postId } = req.query
  console.log(postId)
  const isDeleted = await Post.deleteOne({ _id: postId })

  if(isDeleted) {
    return res.status(200).json({post: 'Post was deleted'})
  } else {
    console.log('Post was not deleted')
  }
}