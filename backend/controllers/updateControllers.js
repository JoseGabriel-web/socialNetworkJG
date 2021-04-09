import { Comment } from '../models/Comment.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { Follower } from '../models/Follower.js'
import { Message } from '../models/Message.js'
import { ChatRoom } from '../models/ChatRoom.js'

export const updateAllInstances = (userId) => {
  updateComments(userId)
  updatePosts(userId)
  updateFollowers(userId)
  updateMessages(userId)
  updateChatRoomUsers(userId)
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

export const updateFollowers = async (userId) => {
  const followers = await Follower.find({ followerId: userId })
  followers.forEach(async follower => {
    let user = await User.findById({ _id: userId })
    follower.followerName = user.name
    follower.save()
  })
}

export const updateMessages = async (userId) => {
  const messages = await Message.find({ creator: userId })
  messages.forEach(async message => {
    let user = await User.findById({ _id: userId })
    message.sender = user.name
    message.save()
  })
}

export const updateChatRoomUsers = async (userId) => {
  // let chatRooms = await ChatRoom.find({ 'users.userId': { $in: [userId]} })
  // chatRooms.forEach(chatRoom => {
  //   chatRoom.users.forEach(async user => {
  //     let updatedUser = await User.findById({ _id: user.userId })
  //     user.name = await updatedUser.name
  //     console.log(updatedUser)
  //   })
  //   chatRoom.save()
  //   // console.log(chatRoom)
  // })
  ChatRoom.find({ 'users.userId': userId }, (err, chatRooms) => {
    if(err) return console.error(err)
    chatRooms.forEach(chatRoom => {
      chatRoom.users.forEach(async user => {
        let updatedUser = await User.findById({ _id: user.userId })
        user.name = await updatedUser.name
        console.log(updatedUser.name)
      })
      console.log(chatRoom)
      chatRoom.save()
    })
  })
}

// TODOS

// [x] - should provide the documents _id to UI for better backend - fronend comunication an ease of tasks in backend 
// [x] - updatedFollowers and Following system || implement it with th userId and FollowerId not names
// [x] - updateFollowers
// [x] - updateMessages
// [x] - also should twick the messagin rooms to use the users _id and should provide the sidebarUser _id along with the currentUser _id to create Rooms
// [] - updateNotifications 
// [] - updateChatRooms users names 