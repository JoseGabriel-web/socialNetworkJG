import { ChatRoom } from "../models/ChatRoom.js"
import { Comment } from "../models/Comment.js"
import { Follower } from "../models/Follower.js"
import { Like } from "../models/Like.js"
import { Message } from "../models/Message.js"
import { Notification } from "../models/Notification.js"
import { Post } from "../models/Post.js"
import { User } from "../models/User.js"
import { getNotifications } from "./notificationControllers.js"
import * as updateControllers from "./updateControllers.js"

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("name profilePicture _id")
    return res.status(201).json({ users })
  } catch (error) {
    next(error)
  }
}

export const getUserInfo = (req, res, next) => {
  return User.findById({ _id: req.user._id }, async (err, user) => {
    if (err) return next(err)
    if(!user) return next(new Error('No user found'))
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      notifications: await getNotifications(user._id),
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
  try {
    const { _id } = req.user
    const { name, email, password } = req.body
    const user = await User.findOne({ _id })
    user.name = name || (await user.name)
    user.email = email || (await user.email)
    if (password) {
      user.password = password
    }
    await user.save()
    if (name) {
      updateControllers.updateAllInstances(user._id)
    }
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      notifications: await getNotifications(user._id),
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.user
    await Comment.deleteMany({ creator: _id })
    await Like.deleteMany({ creator: _id })
    await Message.deleteMany({ creator: _id })
    await Follower.deleteMany({ userId: _id })
    await Follower.deleteMany({ followerId: _id })
    await Post.deleteMany({ creator: _id })
    await Notification.deleteMany({ from: _id })
    await Notification.deleteMany({ to: _id })
    await ChatRoom.deleteMany({ "users.userId": _id })    
    await User.deleteOne({ _id })
    res.status(200)
  } catch (error) {
    next(error)
  }
}
