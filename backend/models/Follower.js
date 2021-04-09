import mongoose from "mongoose"

const followerSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  followerId: { type: mongoose.Types.ObjectId },
  followerName: { type: String, required: true }
})

export const Follower = mongoose.model("Follower", followerSchema)
