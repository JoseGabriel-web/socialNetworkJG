import React, { useState } from 'react'
import styles from '../css/messagingScreen.module.css'
import ChatSidebar from '../components/ChatSidebar'
import Chat from '../components/Chat'

const MessagingScreen = () => {
  const [isOpened, setIsOpened] = useState(true)

  return (
    <div className={styles.messagingScreenConatiner}>
      <div className={styles.chatComponentContainer}>                        
        <Chat isOpened={isOpened} setIsOpened={setIsOpened} />         
      </div>      
      <div
        className={`${styles.chatsidebarComponentContainer} ${
          isOpened ? styles.isOpened : styles.isClosed
        }`}
      >
        <ChatSidebar />
      </div>      
    </div>
  )
}

export default MessagingScreen

