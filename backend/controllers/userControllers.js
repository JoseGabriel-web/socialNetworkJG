import { Comment } from '../models/Comment.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import * as updateControllers from './updateControllers.js'

export const getAllUsers = async ( req, res, next ) => {  
  try {
    const users = await User.find({}).select('name profilePicture _id')
    return res.status(201).json({ users })
  } catch(error) {
    next(error)
  }
}

export const getUserInfo = (req, res, next) => {  
  return User.findById({ _id: req.user._id }, (err, user) => {
    if (err) return next(err)
    return res
      .status(201)
      .json({
        _id: user._id,
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
        updateControllers.updateAllInstances(req.user._id)
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
    updateControllers.updateAllInstances(savedUser._id)
    return res
      .status(201)
      .json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
      })
  })
}