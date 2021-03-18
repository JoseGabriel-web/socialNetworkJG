import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/chat.module.css'
import ChatInput from './ChatInput'
import Message from './Message'

const Chat = ({ isOpened, setIsOpened }) => {
  const loginReducer = useSelector((state) => state.loginReducer)
  const { user } = loginReducer

  const isCurrentUser = (message) => {    
    return message.username === user?.name
  }  

  const otherUserMessage = {
    sender: 'chillin',    
    body: 'This is a message in the chat asda asd sad asdasasdasd adasd asdasd sadsaasd adasd sadas This i',
    createdDate: '3/15/21',
  }
  const userMessage = {
    sender: 'jose',    
    body: 'This is a message in the chat asda asd sad asdasasdasd adasd asdasd sadsaasd adasd sadas ThiThis is a message in the chat asda asd sad asdasasdasd  adasd asdasd sadsaasd adasd sadas ThiThis is is a message in the chat asda asd sad asdasasdasd  adasd asdasd sadsaasd adasd sadas.',
    createdDate: '12/05/21',
  }
  const messages = [
    userMessage,
    otherUserMessage,
    userMessage,
    otherUserMessage,    
  ]

  return (
    <div className={styles.chatContainer}>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className={`${styles.handleChatSidebarBtn} fas fa-angle-double-${
          isOpened ? 'right' : 'left'
        }`}
      />
      <div className={styles.chatContent}>
        {messages.map((message) => (
          <Message message={message} />
        ))}
      </div>
      <div className={styles.chatInputComponentContainer}>
        <ChatInput />
      </div>
    </div>
  )
}

export default Chat
