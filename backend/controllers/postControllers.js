import { Post } from "../models/Post.js"
import { Comment } from "../models/Comment.js"
import { User } from "../models/User.js"
import { Like } from "../models/Like.js"

export const createPost = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { title, description } = req.body
    const user = await User.findById(_id).select(["name", "profilePicture"])
    await Post.create({
      creator: _id,
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
    res.status(200).json({ message: "Post Created" })
  } catch (error) {
    next(error)
  }
}

export const getPosts = async (_, res, next) => {
  try {
    let posts = await Post.find({})
    posts.forEach(async (post) => {
      const comments = await Comment.find({ postId: post._id })
      const likes = await Like.find({ postId: post._id })
      post.comments = comments
      post.likes = likes.map(({ name }) => name)
      await post.save()
    })
    return res.status(200).json({ posts: posts.reverse() })
  } catch (error) {
    next(error)
  }
}

export const likePost = async (req, res, next) => {
  try {
    const { action, postId } = req.body
    const { _id, name } = req.user
    const alreadyLiked = await Like.findOne({ name, creator: _id, postId })
    if (!alreadyLiked && action === "like") {
      await Like.create({ name, creator: _id, postId })
      return res.status(200).json({ action })
    } else if (action === "unlike") {
      await Like.deleteOne({ name, creator: _id, postId })
      return res.status(200).json({ action })
    }
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.query
    await Post.deleteOne({ _id: postId })
    await Comment.deleteMany({ postId })
    await Like.deleteMany({ postId })
    return res.status(200).json({ post: "Post was deleted" })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
