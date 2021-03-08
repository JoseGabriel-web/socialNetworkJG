import { User } from '../models/User.js'
import { generateAccessToken } from '../utils/generateAccessToken.js'
import { generateRefreshToken } from '../utils/generateRefreshToken.js'
import { updatedAllUserPost } from '../controllers/postControllers.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res, next) => {
  const { name, email, password } = req.body
  const user = new User({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  })
  user.save((err, newUser) => {
    if (err) return next(err)
    res.status(200).json({
      name: newUser.name,
      email: newUser.email,
      accessToken: generateAccessToken(newUser._id),
      refreshToken: generateRefreshToken(newUser._id),
    })
  })
}

export const login = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (user === null) return next(new Error('No user found'))
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) return next(new Error('Incorrect password'))
    res.status(200).json({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      accessToken: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    })
  })
}

export const updateProfilePicture = async (req, res, next) => {
  const profilePicture = {
    url: req.file.path,
    public_id: req.file.filename,
  }
  const user = await User.findOne({ _id: req.body._id })
  User.updateOne(
    { _id: req.body._id },
    { $set: { profilePicture: profilePicture } },
    (err, result) => {
      if (err) return next(err)
      else {
        updatedAllUserPost(user.name, {name: user.name, profilePicture: profilePicture.url})
        res.status(200).json({ profilePicture })
      }
    }
  )
}

export const updateUser = async (req, res, next) => {
  const { _id, name, email, password } = req.body
  const user = await User.findOne({ _id })
  const postsUsername = await user.name
  user.name = name || (await user.name)
  user.email = email || (await user.email)
  if (password) {
    user.password = password
  }
  user.save((err, savedUser) => {
    if (err) return next(err)
    let updatedUser = {
      name: savedUser.name,
      email: savedUser.email,
    }
    let postUpdatedUser = {
      name: savedUser.name,
      profilePicture: savedUser.profilePicture.url,
    }
    updatedAllUserPost(postsUsername, postUpdatedUser)
    res.status(200).json({ updatedUser })
  })
}
