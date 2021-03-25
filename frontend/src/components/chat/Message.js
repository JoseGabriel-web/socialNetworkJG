import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/message.module.css'

const Message = ({ message }) => {

  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer

  const isCurrentUser = (message) => {    
    return message.sender === user?.name
  }

  return (
    <div>    
      <div
        className={`${styles.chatMessage} ${
          isCurrentUser(message) ? styles.userMessage : null
        }`}
      >
        <div><strong className={styles.username}>{message.sender}:</strong> {message.body}</div>
        <div>{message.createdDate}</div>
      </div>    
    </div>
  )
}

export default Message
