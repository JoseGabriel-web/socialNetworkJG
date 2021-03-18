import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/message.module.css'

const Message = ({ message }) => {

  const loginReducer = useSelector((state) => state.loginReducer)
  const { user } = loginReducer

  const isCurrentUser = (message) => {    
    return message.sender === user?.name
  }
 

  // const messageSchema = mongoose.Schema({
  //   chatRoomId: { type: mongoose.Types.ObjectId },
  //   sender: { type: String },
  //   body: { type: String },
  //   createdDate: { type: Date, default: Date.now }  
  // })

  return (
    <div
      className={`${styles.chatMessage} ${
        isCurrentUser(message) ? styles.userMessage : null
      }`}
    >
      <div><strong className={styles.username}>{message.sender}:</strong> {message.body}</div>
      <div>{message.createdDate}</div>
    </div>
  )
}

export default Message
