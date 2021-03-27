import { User } from '../models/User.js'
import { updatedAllUserPost } from '../controllers/postControllers.js'
import { updateAllUserFollowers } from './followerControlers.js'

export const getAllUsers = async ( req, res, next ) => {  
  try {
    const users = await User.find({}).select('name profilePicture -_id')
    // const formatedUsers = users.map()
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
  const user = await User.findOne({ _id: req.user._id })
  User.updateOne(
    { _id: req.user._id },
    { $set: { profilePicture: profilePicture } },
    (err, result) => {
      if (err) return next(err)
      else {
        updatedAllUserPost(user.name, {
          name: user.name,
          profilePicture: profilePicture.url,
        })
        res.status(200).json({ profilePicture })
      }
    }
  )
}

export const updateUser = async (req, res, next) => {
  const { _id } = req.user
  const { name, email, password } = req.body
  const user = await User.findOne({ _id })
  const postsUsername = await user.name  
  user.name = name || (await user.name)
  user.email = email || (await user.email)
  if (password) {
    user.password = password
  }
  user.save((err, savedUser) => {
    if (err) return next(err)
    let postUpdatedUser = {
      name: savedUser.name,
      profilePicture: savedUser.profilePicture.url,
    }
    updatedAllUserPost(postsUsername, postUpdatedUser, next)        
    return res
      .status(201)
      .json({
        name: savedUser.name,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
      })
  })
}
