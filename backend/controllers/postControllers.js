import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const createPost = async (req, res) => {  
  const { _id, title, description } = req.body     
  const user = await User.findById({ _id: _id }).select(['_id', 'name'])
  await Post.create({
    user: { _id: user._id, username: user.name },
    title,
    description,    
    image: {
      url: req.file.path,
      public_id: req.file.filename
    }
  })

  res.status(200).json({ message: 'Post Created' })
}

export const getPosts = async (req, res) => {  
  const posts = await Post.find({})   
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
  if(action === 'like') {
    Post.updateOne({_id: postId}, {$push: {likes: [username]}}, (err, result) => {
      if(err) res.status(500).json({err})
      else {
        res.status(200).json({action})
      }
    })
  } else if(action === 'unlike') {    
    Post.updateOne({_id: postId}, { $pull: { likes: { $in: [username] } } }, (err,result) => {
      if(err) res.status(500).json({err})
      else {
        res.status(200).json({action})
      }
    })    
  }
}