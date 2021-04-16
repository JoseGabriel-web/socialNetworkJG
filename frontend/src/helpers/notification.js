import { socket } from '../Layout'

export const emitNotification = ({ from, to, type, username }) => {    
  socket.emit("sendNotification", {
    notification: { from, to, type },
    username,
  })
}