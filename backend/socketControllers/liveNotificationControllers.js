import { onlineUsers } from './onlineUsersController.js'

export const liveNotificationControllers = (io, socket) => {
  
  socket.on('sendNotification', ({notification, username}) => {    
    if(Object.keys(onlineUsers).includes(username)) {
      onlineUsers[username].socketIds.forEach(socketId => {
        io.to(`${socketId}`).emit('receiveNotification', notification)
      })
    }
  })

  
}