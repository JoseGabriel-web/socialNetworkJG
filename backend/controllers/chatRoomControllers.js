import { ChatRoom } from "../models/ChatRoom.js"
import { getMessages } from "./messageControllers.js"

const createChatRoom = async (users, chatRoomQuery) => {
  const chatRoom = await ChatRoom.create({ users, chatRoomQuery })
  console.log('Created new ChatRoom')
  return chatRoom
}

export const getChatRoom = async (req, res, next) => {
  try {
    let { users } = req.body
    users = users.sort((a,b) => a.userId < b.userId? 1 : -1)
    let chatRoomQuery = `${users.map(({ userId }) => userId)}`.split(',').join('')  
    console.log(users)  
    console.log(chatRoomQuery)  
    const chatRoom = await ChatRoom.findOne({ chatRoomQuery })    
    if (!chatRoom) {
      const newChatRoom = await createChatRoom(users, chatRoomQuery)
      return res
        .status(201)
        .json({
          chatRoomId: newChatRoom._id,
          messages: [],
          users: await getUsersInChatRoom(await newChatRoom._id),
        })
    }
    const messages = await getMessages(chatRoom._id)
    res
      .status(201)
      .json({
        chatRoomId: chatRoom._id,
        messages,
        users: await getUsersInChatRoom(await chatRoom._id),
      })
  } catch (error) {
    next(error)
  }
}

export const getUsersInChatRoom = async (chatRoomId) => {
  const chatRoom = await ChatRoom.findOne({ _id: chatRoomId }).lean()  
  let users = chatRoom.users.map(user => user.name)  
  return users
}