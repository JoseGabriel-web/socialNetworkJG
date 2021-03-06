import { User } from "../models/User.js"
import { Post } from "../models/Post.js"

export const getProfile = async (req, res, next) => {
  let name = req.params.username
  name = name.split("+").join(" ")
  try {
    const user = await User.findOne({ name })
    if(!user) return next(new Error('No user found'))
    const posts = await Post.find({ creator: user._id })
    const profile = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
      posts,
    }
    res.status(200).json({ profile })
  } catch (error) {
    next(error)
  }
}
