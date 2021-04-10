import { createMessage } from '../controllers/messageControllers.js'
import { getUsersInChatRoom } from '../controllers/chatRoomControllers.js'
import { onlineUsers } from './onlineUsersController.js'
// import * as notificationControllers from '../controllers/notificationControllers.js'

// const emitMsgNotification = (chatRoomUsers, io, socket, sender) => {  
//   chatRoomUsers.forEach(user => {         
//     const isOnline = Object.keys(onlineUsers).includes(user)        
//     if(isOnline) {
//       onlineUsers[user].socketIds.forEach(socketId => {                   
//         socket.broadcast.to(`${socketId}`).emit('messageNotification', sender)
//       })
//     }
//   })
// }

export const chatControllers = (io, socket) => {
  
  socket.on('sendMessage', async ({ chatRoomId, creator, sender, body }) => {
    createMessage({ chatRoomId, creator, sender, body })    
    const chatRoomUsers = await getUsersInChatRoom(chatRoomId)
    const date = new Date().toLocaleDateString('en-US')
    const newMessage = { chatRoomId, creator, sender, body, createdDate: date }
    io.to(chatRoomId).emit('receiveMessage', newMessage)          
  })

  socket.on('joinRoom', ({ name, chatRoomId }) => {
    console.log(onlineUsers[name], chatRoomId)
    socket.leaveAll()
    socket.join(chatRoomId)
  })


}

// On Send message we are going to get the message info sent request to create it on DB with function already created for that, than getUsersInChatRoom and send to each users socketId if user in array OnlineUsers.