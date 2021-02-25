import { Post } from '../models/Post.js'
import { User } from '../models/User.js'


export const createPostComment = async (req,res) => {
  const { _id, postId, label } = req.body
  const user = await User.findById({_id}).select(['name', 'profilePicture'])
  let newComment = {
    label,
    user: {
      name: await user.name,
      profilePicture: await user.profilePicture.url
    }
  }
  Post.updateOne({_id: postId}, {$push: { comments: [newComment] } }, (err,result) => {
    if(err) res.status(500).json({error})
    else {
      console.log(result)
      res.status(200).json({newComment})
    }
  })
}

export const deletePostComment = (req,res) => {
  const { postId, label } = req.query    
  Post.updateOne({_id: postId}, 
    { $pull: { 
        comments: {label: label}
      }
    }, (error,result) => {
      
    if(error) {
      res.status(500).json({error})      
    } else {
      res.status(200).json({message: 'Comment deleted'})
    }
  })
}