import { Post } from "../models/Post.js"
import { Comment } from "../models/Comment.js"
import { User } from "../models/User.js"
// import { updateAllUserFollowers } from './followerControlers.js'

// editing this
export const createPost = async (req, res) => {
  try {
    const { _id } = req.user
    const { title, description } = req.body   
    const user = await User.findById(_id).select(['name', 'profilePicture'])
    await Post.create({
      creator: _id,
      user: {
        name: user.name,
        profilePicture: user.profilePicture.url
      },
      title,
      description,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    })
    res.status(200).json({ message: "Post Created" })
  } catch (error) {
    next(error)
  }
}

export const getPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({})            
    posts.forEach(async (post) => {      
      const comments = await Comment.find({ postId: post._id })     
      post.comments = comments      
      await post.save()
    })
    return res.status(200).json({ posts: posts.reverse() })
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.query
    console.log(postId)
    await Post.deleteOne({ _id: postId })    
    await Comment.deleteMany({ postId })
    return res.status(200).json({ post: "Post was deleted" })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const likePost = async (req, res) => {
  const { action, postId, username } = req.body
  if (action === "like") {
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
  } else if (action === "unlike") {
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

// const updatePostsLikes = (postsUsername, postUpdatedUser, next) => {
//   Post.updateMany(
//     { likes: [postsUsername] },
//     { $push: { likes: [postUpdatedUser.name] } },
//     (err, result) => {
//       if (err) return next(err)
//       else {
//         Post.updateMany(
//           {  },
//           {$pull: {likes: { $in: [postsUsername]}}},
//           (err, result) => {
//             if (err) return next(err)
//             else {
//               updatePostsComments(postsUsername, postUpdatedUser, next)
//             }
//           }
//         )
//       }
//     }
//   )
// }
