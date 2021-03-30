export const onlineUsers = {}

export const addToOnlineUsers = (username, socketId) => {
  if(!onlineUsers[username]) {
    onlineUsers[username] = {
      socketIds: [socketId]
    }
  }
  if(!onlineUsers[username].socketIds.includes(socketId)) {
    onlineUsers[username].socketIds.push(socketId)
  }
}

export const removeFromOnlineUsers = (username, socketId) => {
  if(onlineUsers[username]) {    
    onlineUsers[username].socketIds = onlineUsers[username].socketIds.filter(socket => socket != socketId)
    if(onlineUsers[username].socketIds.length == 0) {
      delete onlineUsers[username]
    }
  }
}

export const onlineUsersController = (io, socket) => {
  socket.on('userConnected', ({ username }) => {
    addToOnlineUsers(username, socket.id)    
    socket.username = username
    io.emit('onlineUsers', { onlineUsernames: Object.keys(onlineUsers) })
    console.log(`Users ${JSON.stringify(onlineUsers)} connected`)    
  })


  
  socket.on('disconectUser', ({ name }) => {
    removeFromOnlineUsers(name, socket.id)    
  })
  
  socket.on('disconnect', () => {
    removeFromOnlineUsers(socket.username, socket.id)
    io.emit('onlineUsers', { onlineUsernames: Object.keys(onlineUsers) })
    console.log(`Users ${JSON.stringify(onlineUsers)} connected`)       
  })
}