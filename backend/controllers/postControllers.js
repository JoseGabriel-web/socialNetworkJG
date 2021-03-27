import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { updateAllUserFollowers } from './followerControlers.js'

export const createPost = async (req, res) => {
  const { _id } = req.user
  const { title, description } = req.body
  const user = await User.findById({ _id: _id }).select([
    '_id',
    'name',
    'profilePicture',
  ])
  const newPost = new Post({
    user: {
      name: user.name,
      profilePicture: user.profilePicture.url,
    },
    title,
    description,
    image: {
      url: req.file.path,
      public_id: req.file.filename,
    },
  })
  newPost.save((err, result) => {
    if (err) throw err
    res.status(200).json({ message: 'Post Created' })
  })
}

export const getPosts = (req, res, next) => {  
  Post.find({}, (err, posts) => {
    if(err) return next(err)
    res.status(200).json({ posts: posts.reverse() })    
  })
}

export const deletePost = async ( req, res, next ) => {
  try {
    const { postId } = req.query
    console.log(postId)
    await Post.deleteOne({ _id: postId })  
    return res.status(200).json({ post: 'Post was deleted' })
  } catch (error) {
    console.log(error)  
    next(error)
  }
}

export const likePost = async (req, res) => {
  const { action, postId, username } = req.body
  if (action === 'like') {
    Post.updateOne(
      { _id: postId },
      { $push: { likes: [username] } },
      (err, result) => {
        if (err) res.status(500).json({ err })
        else {
          res.status(200).json({ action })
        }
      }
    )
  } else if (action === 'unlike') {
    Post.updateOne(
      { _id: postId },
      { $pull: { likes: { $in: [username] } } },
      (err, result) => {
        if (err) res.status(500).json({ err })
        else {
          res.status(200).json({ action })
        }
      }
    )
  }
}

export const updatedAllUserPost = (postsUsername, postUpdatedUser, next) => {
  Post.updateMany(
    { 'user.name': postsUsername },
    {
      $set: {
        'user.name': postUpdatedUser.name,
        'user.profilePicture': postUpdatedUser.profilePicture,
      },
    },
    (err, result) => {
      if (err) return next(err)
      else {
        try {
          updatePostsLikes(postsUsername, postUpdatedUser, next)
        } catch (error) {
          next(error)
        }
      }
    }
  )
}


const updatePostsLikes = (postsUsername, postUpdatedUser, next) => {
  Post.updateMany(
    { likes: [postsUsername] },
    { $push: { likes: [postUpdatedUser.name] } },
    (err, result) => {
      if (err) return next(err)
      else {
        Post.updateMany(
          {  },
          {$pull: {likes: { $in: [postsUsername]}}},
          (err, result) => {
            if (err) return next(err)
            else {             
              updatePostsComments(postsUsername, postUpdatedUser, next)
            }
          }
        )
      }
    }
  )
}



const updatePostsComments = async (postsUsername, postUpdatedUser, next) => {
  const posts = await Post.find({ comments: { $elemMatch: { 'user.name': postsUsername } } })
  if(posts) {
    await posts.map(post => {      
      for(let i = 0; i < post.comments.length; i++) {
        if(post.comments[i].user.name === postsUsername) {
          post.comments[i].user.name = postUpdatedUser.name
          post.comments[i].user.profilePicture = postUpdatedUser.profilePicture
        }
      }      
      post.save()
      updateAllUserFollowers(postsUsername, postUpdatedUser.name, next)    
    })
    // return
  }
}