import { onlineUsers } from './onlineUsersController.js'
import * as notificationControllers from '../controllers/notificationControllers.js'

export const liveNotificationControllers = (io, socket) => {
  
  socket.on('sendNotification', ({notification, username}) => {    
    if(Object.keys(onlineUsers).includes(username)) {
      onlineUsers[username].socketIds.forEach(socketId => {
        io.to(`${socketId}`).emit('receiveNotification', notification)
      })
    }
  })

  socket.on('deleteNotification', ({ notification, username }) => {
    if(notification) {
      console.log('Information to delete notification -> ', notification, username)
      notificationControllers.deleteNotification(notification, username)
    }
  })

}