import { createMessage } from '../controllers/messageControllers.js'
import { getUsersInChatRoom } from '../controllers/chatRoomControllers.js'
import { onlineUsers } from './onlineUsersController.js'

export const chatControllers = (io, socket) => {
  
  socket.on('sendMessage', async ({ chatRoomId, sender, body }) => {
    createMessage({ chatRoomId, sender, body })
    console.log('Request for Message received in backend')
    const chatRoomUsers = await getUsersInChatRoom(chatRoomId)
    const newMessage = { chatRoomId, sender, body, createdAt: Date.now() }
    chatRoomUsers.forEach(user => {
      const isOnline = Object.keys(onlineUsers).includes(user)
      if(isOnline) {
        const userSocketIds = onlineUsers[user].socketIds
        userSocketIds.forEach(socketId => {
          io.to(socketId).emit('receiveMessage', { newMessage })
        })
      }
    })
    io.to(socket.id).emit('receiveMessage', newMessage)
  })

  


}

// On Send message we are going to get the message info sent request to create it on DB with function already created for that, than getUsersInChatRoom and send to each users socketId if user in array OnlineUsers.