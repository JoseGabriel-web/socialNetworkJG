import { Message } from '../models/Message.js'

export const createMessage = async ({ chatRoomId, sender, body, creator }) => {
  try {    
    await Message.create({
      chatRoomId,
      creator,
      sender,
      body,  
    })
    return
  } catch(error) {
    console.log('Error creating Message -> ',error)
    throw error
  }
}

export const getMessages = async (chatRoomId) => {
  try {
    const messages = await Message.find({ chatRoomId })
    return messages
  } catch(error) {
    console.log('Error getting Messages -> ',error)
  }
}