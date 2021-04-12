import { User } from "../models/User.js"
import { Follower } from "../models/Follower.js"
import * as notificationControllers from "../controllers/notificationControllers.js"

const replaceSpace = (string) => {
  return string.split(" ").join("+")
}

export const getFollowers = async (userId) => {
  try {
    return await Follower.find({ userId }).lean()
  } catch (error) {
    console.error(error.message)
  }
}

export const getFollowings = async (userId) => {
  try {
    return await Follower.find({ followerId: userId }).lean()
  } catch (error) {
    console.error(error.message)
  }
}

export const getFollowersInfo = async (req, res, next) => {
  try {
    const { profileUserId, userId } = req.query
    res
      .status(200)
      .json({
        followersList: await getFollowers(profileUserId),
        followingList: await getFollowings(userId),
      })
  } catch (error) {
    next(error)
  }
}

export const follow = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { userId } = req.body
    console.log(_id, userId)
    const follower = await User.findOne({ _id })
    const following = await User.findOne({ _id: userId })
    await Follower.create({
      userId,
      followerId: _id,
      followerName: follower.name,
    })
    const notification = {
      from: follower.name,
      body: `${follower.name} started Following you!`,
      link: `/profile/${replaceSpace(following.name)}/followers`,
      type: "follow",
    }
    notificationControllers.createNotification(notification, following.name)
    res
      .status(200)
      .json({ message: `${follower.name} started following ${following.name}` })
  } catch (error) {
    next(error)
  }
}

// Takes { userId }
export const unfollow = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { userId } = req.query
    console.log(_id, userId)
    await Follower.deleteOne({ userId, followerId: _id })
    res.status(200).json({ message: `Someone unfollowed someone` })
  } catch (error) {
    next(error)
  }
}
