import React from 'react'
import styles from '../css/chat.module.css'
import ChatInput from './ChatInput'

const Chat = ({ isOpened, setIsOpened }) => {
  return (
    <div className={styles.chatContainer}>
      <div onClick={() => setIsOpened(!isOpened)} className={`${styles.handleChatSidebarBtn} fas fa-angle-double-${isOpened? 'right' : 'left'}`} />
      <div className={styles.chatContent}>
        
      </div>
      <div className={styles.chatInputContainer}>
        <ChatInput />
      </div>
    </div>
  )
}

export default Chat
