import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/chat/messagingScreen.module.css'
import ChatSidebar from '../components/chat/ChatSidebar'
import Chat from '../components/chat/Chat'
import { socket } from '../Layout'
import { getAllUsersAction } from '../actions/userActions'

const MessagingScreen = () => {
  const chatRoomInfoReducer = useSelector((state) => state.chatRoomInfoReducer)
  const { chatRoomId } = chatRoomInfoReducer
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const [isOpened, setIsOpened] = useState(true)
  const [newMessages, setNewMessages] = useState([])  
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.name) {
      dispatch(getAllUsersAction())
    }
  }, [user])

  useEffect(() => {
    if (chatRoomId && user && user.name) {
      socket.emit('joinRoom', { name: user.name, chatRoomId })
    }
  }, [chatRoomId, user])  

  return (
    <div className={styles.messagingScreenConatiner}>              
      <div className={styles.chatComponentContainer}>
        <Chat
          newMessages={newMessages}
          setNewMessages={setNewMessages}
          isOpened={isOpened}
          setIsOpened={setIsOpened}         
        />        
      </div>              
      
      <div
        className={`${styles.chatsidebarComponentContainer} ${
          isOpened ? styles.isOpened : styles.isClosed
        }`}
      >
        <ChatSidebar setNewMessages={setNewMessages} setIsOpened={setIsOpened} />
      </div>
    </div>
  )
}

export default MessagingScreen
