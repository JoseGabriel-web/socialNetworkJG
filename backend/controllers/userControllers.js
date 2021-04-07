import { Comment } from '../models/Comment.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
// import { updateAllUserFollowers } from './followerControlers.js'

export const getAllUsers = async ( req, res, next ) => {  
  try {
    const users = await User.find({}).select('name profilePicture -_id')    
    return res.status(201).json({ users })
  } catch(error) {
    next(error)
  }
}

export const getUserInfo = (req, res, next) => {
  console.log('GOING THROUGH USER INFO')
  return User.findById({ _id: req.user._id }, (err, user) => {
    if (err) return next(err)
    return res
      .status(201)
      .json({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        notifications: user.notifications,
      })
  })
}

export const updateProfilePicture = async (req, res, next) => {
  const profilePicture = {
    url: req.file.path,
    public_id: req.file.filename,
  }
  User.updateOne(
    { _id: req.user._id },
    { $set: { profilePicture: profilePicture } },
    (err, _) => {
      if (err) return next(err)
      else {
        updateAllInstances(req.user._id)
        res.status(200).json({ profilePicture })
      }
    }
  )
}

export const updateUser = async (req, res, next) => {
  const { _id } = req.user
  const { name, email, password } = req.body
  const user = await User.findOne({ _id })  
  user.name = name || (await user.name)
  user.email = email || (await user.email)
  if (password) {
    user.password = password
  }
  user.save((err, savedUser) => {
    if (err) return next(err)
    updateAllInstances(savedUser._id)
    return res
      .status(201)
      .json({
        name: savedUser.name,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
      })
  })
}

// should move this code down here to an UpdateControllers.js

const updateAllInstances = (userId) => {
  updateComments(userId)
  updatePosts(userId)
}

const updateComments = async (userId) => {
  let comments = await Comment.find({ creator: userId })
  comments.forEach(async comment => {
    let userComment = await User.findById({ _id: comment.creator })
    comment.user.name = await userComment.name
    comment.user.profilePicture = await userComment.profilePicture.url
    comment.save()
  })
}

const updatePosts = async (userId) => {
  let posts = await Post.find({ creator: userId })
  posts.forEach(async post => {
    let userPost = await User.findById({ _id: post.creator })
    post.user.name = await userPost.name
    post.user.profilePicture = await userPost.profilePicture.url
    post.save()
  })
}

// todo's -> updatedFollowers and Following | updateMessages | updateNotifications should provide the documents _id to UI for better backend - fronend comunication an ease of tasks in backend also should twick the messagin rooms to use the users _id and should provide the sidebarUser _id along with the currentUser _id to create Rooms