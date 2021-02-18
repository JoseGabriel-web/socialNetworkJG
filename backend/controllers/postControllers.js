import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const createPost = async (req, res) => {  
  const { _id, title, description } = req.body     
  const user = await User.findById({ _id: _id })
  const post = await Post.create({
    user: { _id: user._id, username: user.name },
    title,
    description,    
    image: {
      url: req.file.path,
      public_id: req.file.filename
    }
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
  const isDeleted = await Post.deleteOne({ _id: postId })

  if(isDeleted) {
    return res.status(200).json({post: 'Post was deleted'})
  } else {
    console.log('Post was not deleted')
  }
}

export const likePost = async (req,res) => {
  const { action, postId, username } = req.body
  console.log(req.body)
  const post = await Post.findById({_id: postId})
  if(action === 'like') {
    post.likes.push(username)    
    post.save()
  } else if(action === 'unlike') {    
    post.likes.pull(username)    
    post.save()
  }
  res.status(200).send({action})
}