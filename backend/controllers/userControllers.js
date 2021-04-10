import { User } from '../models/User.js'
import { getNotifications } from './notificationControllers.js'
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
  return User.findById({ _id: req.user._id }, async (err, user) => {
    if (err) return next(err)
    return res
      .status(201)
      .json({
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
    if(name) {
      updateControllers.updateAllInstances(user._id)
    }
    return res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        notifications: await getNotifications(user._id),
      })    
  } catch(error) {
    next(error)
  }  
}