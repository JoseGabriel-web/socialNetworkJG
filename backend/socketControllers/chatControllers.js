import { createMessage } from '../controllers/messageControllers.js'
import { getUsersInChatRoom } from '../controllers/chatRoomControllers.js'
import { onlineUsers } from './onlineUsersController.js'

const emitMsgNotification = (chatRoomUsers, io, sender) => {
  chatRoomUsers.forEach(user => {         
    const isOnline = Object.keys(onlineUsers).includes(user)      
    if(isOnline) {
      onlineUsers[user].socketIds.forEach(socketId => {                
        io.to(`${socketId}`).emit('messageNotification', sender) 
      })
    }
  })
}

export const chatControllers = (io, socket) => {
  
  socket.on('sendMessage', async ({ chatRoomId, sender, body }) => {
    createMessage({ chatRoomId, sender, body })    
    const chatRoomUsers = await getUsersInChatRoom(chatRoomId)
    const newMessage = { chatRoomId, sender, body, createdAt: Date.now() }
    io.to(chatRoomId).emit('receiveMessage', newMessage)    
    emitMsgNotification(chatRoomUsers, io, sender)    
  })

  socket.on('joinRoom', ({ name, chatRoomId }) => {
    console.log(onlineUsers[name], chatRoomId)
    socket.leaveAll()
    socket.join(chatRoomId)
  })


}

// On Send message we are going to get the message info sent request to create it on DB with function already created for that, than getUsersInChatRoom and send to each users socketId if user in array OnlineUsers.