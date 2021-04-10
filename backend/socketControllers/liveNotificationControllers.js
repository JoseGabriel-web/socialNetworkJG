import { onlineUsers } from './onlineUsersController.js'
import * as notificationControllers from '../controllers/notificationControllers.js'

export const liveNotificationControllers = (io, socket) => {
  
  socket.on('sendNotification', async ({notification, username}) => { 
    if(notification) {
      const { from, to, type } = notification
      notification = await notificationControllers.createNotification({ from, to, type })
      if(!notification) return
    }
    if(username && Object.keys(onlineUsers).includes(username)) {
      onlineUsers[username].socketIds.forEach(socketId => {
        io.to(`${socketId}`).emit('receiveNotification', notification)
      })
    } else {
      return
    }
  })

  socket.on('deleteNotification', ({ notificationId }) => {
    if(notificationId) {      
      notificationControllers.deleteNotification(notificationId)
    }
  })

}