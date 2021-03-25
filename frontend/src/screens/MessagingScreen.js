import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../css/chat/messagingScreen.module.css'
import ChatSidebar from '../components/chat/ChatSidebar'
import Chat from '../components/chat/Chat'
import { getAllUsersAction } from '../actions/userActions'

const MessagingScreen = () => {
  const [isOpened, setIsOpened] = useState(true)
  const dispatch = useDispatch()  

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [])

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

