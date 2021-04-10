import { Comment } from '../models/Comment.js'
import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { Follower } from '../models/Follower.js'
import { Message } from '../models/Message.js'
import { ChatRoom } from '../models/ChatRoom.js'
import { Like } from '../models/Like.js'

export const updateAllInstances = (userId) => {
  updateChatRoomUsers(userId)
  updateComments(userId)
  updatePosts(userId)
  updateFollowers(userId)
  updateMessages(userId)
  updateLikes(userId)
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

export const updateLikes = async (userId) => {
  let likes = await Like.find({ creator: userId })
  likes.forEach(async like => {
    let userLike = await User.findById({ _id: like.creator })
    like.name = await userLike.name    
    like.save()
  })
}

export const updateChatRoomUsers = async (userId) => {  
  try {
    const chatRooms = await ChatRoom.find({ 'users.userId': userId })    
    for(let i = 0; i < chatRooms.length; i++) {      
      for(let j = 0; j < chatRooms[i].users.length; j++) {        
        if(chatRooms[i].users[j].userId.toString() == userId.toString()) {
          let updatedUser = await User.findById({ _id: userId }).select('name').lean()
          chatRooms[i].users[j].name = updatedUser.name          
          chatRooms[i].save()
        }
      }
    }          
  } catch (error) {
    console.error(error.message)    
  }
}

// TODOS

// [x] - should provide the documents _id to UI for better backend - fronend comunication an ease of tasks in backend 
// [x] - updatedFollowers and Following system || implement it with th userId and FollowerId not names
// [x] - updateFollowers
// [x] - updateMessages
// [x] - also should twick the messagin rooms to use the users _id and should provide the sidebarUser _id along with the currentUser _id to create Rooms
// [x] - updateChatRooms users names 
// [] - updateNotifications 