import { Comment } from '../models/Comment.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

export const updateAllInstances = (userId) => {
  updateComments(userId)
  updatePosts(userId)
}

export const updateComments = async (userId) => {
  let comments = await Comment.find({ creator: userId })
  comments.forEach(async comment => {
    let userComment = await User.findById({ _id: comment.creator })
    comment.user.name = await userComment.name
    comment.user.profilePicture = await userComment.profilePicture.url
    comment.save()
  })
}

export const updatePosts = async (userId) => {
  let posts = await Post.find({ creator: userId })
  posts.forEach(async post => {
    let userPost = await User.findById({ _id: post.creator })
    post.user.name = await userPost.name
    post.user.profilePicture = await userPost.profilePicture.url
    post.save()
  })
}

// TODOS

// [x] - should provide the documents _id to UI for better backend - fronend comunication an ease of tasks in backend 
// [] - updatedFollowers and Following 
// [] - updateMessages
// [] - updateNotifications 
// [] - also should twick the messagin rooms to use the users _id and should provide the sidebarUser _id along with the currentUser _id to create Rooms