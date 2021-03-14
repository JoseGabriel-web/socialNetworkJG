import React from 'react'
import styles from '../css/chat.module.css'

const Chat = ({ isOpened, setIsOpened }) => {
  return (
    <div className={styles.chatContainer}>
      <div onClick={() => setIsOpened(!isOpened)} className={`${styles.handleChatSidebarBtn} fas fa-angle-double-${isOpened? 'right' : 'left'}`} />
    </div>
  )
}

export default Chat
