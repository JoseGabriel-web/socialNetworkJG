import { ChatRoom } from '../models/ChatRoom.js'
import { getMessages } from './messageControllers.js'

// Creates ChatRoom and returns ChatRoom _id
export const createChatRoom = async (users) => {
  const chatRoom = await ChatRoom.create({ users })
  return await chatRoom._id
}

// Gets ChatRoom and if doesn't exist creates one
export const getChatRoom = async (req, res, next) => {
  try {
    const { users } = req.body
    const chatRoom = await ChatRoom.findOne({ users: users.sort() })
    if (!chatRoom) {
      const newChatRoomId = await createChatRoom(users.sort())
      return res.status(201).json({ chatRoomId: newChatRoomId, messages: [] })
    }
    const messages = await getMessages(chatRoom._id)
    res.status(201).json({ chatRoomId: chatRoom._id, messages })
  } catch (error) {
    next(error)
  }
}

export const getUsersInChatRoom = async (chatRoomId) => {
  const chatRoom = await ChatRoom.findOne({ _id: chatRoomId })
  return await chatRoom.users
}

// WHEN CLICKING ON FRONTEND USER WE ARE GOING TO REQUEST THE CHATROOMID BY GETTING THE CHATROOM WITH THE USERS LIKE SO -> ChatRoom.findOne({ users }) IF DOESN'T EXIST WE ARE GOING TO USE createChatRoom AND PROVIDE THE CHATROOM ID SO WE ARE ABLE TO SET IT IN THE REDUCER AS THE CURRENT CHATROOM AND WHEN CREATING MESSAGES WE ARE GOING TO CREATE THEM WITH THE CHATROOMID IN THE REDUCER

// WHEN SENDING MESSAGES WE ARE ALREADY GOING TO HAVE THE CHATROOMID SO WE CAN CALL A FUNCTION THAT WILL SAVE THE MESSAGE TO THE DATABASE WITH THE CHATROOMID AND SENDER (SHOULD HOW TO GET THE USERNAME WHICH CAN BE SENT FROM FRONTEND REDUCER USERINFO OR GETTING FROM THE ONLINE USERS BY QUERING SOME WAY) AND EMIT IT TO THE SOCKETS WITH NAME FROM OTHER USER IN CHATROOM CAN GET THE OTHER USERS IN CHATROOM WITH A FUNCTION THAT GETS USERS IN CHATROOM BY GETTIN THE CHATROOM USERS FINDING IT BY ID PROVIDED FROM SENDER.
