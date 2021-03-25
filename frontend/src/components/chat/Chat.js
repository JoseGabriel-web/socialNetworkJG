import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chat.module.css'
import ChatInput from './ChatInput'
import Message from './Message'
import Loading from '../layout/Loading'
import { socket } from '../../Layout'

const Chat = ({ isOpened, setIsOpened }) => {

  const chatRoomInfoReducer = useSelector(state => state.chatRoomInfoReducer)
  const { messages = [], loading } = chatRoomInfoReducer
  const [newMessages, setNewMessages] = useState([])

  socket.on('receiveMessage', ({ newMessage }) => {
    setNewMessages([...newMessages, newMessage])
  })


  return (
    <div className={styles.chatContainer}>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className={`${styles.handleChatSidebarBtn} fas fa-angle-double-${
          isOpened ? 'right' : 'left'
        }`}
      />  
        
          <div className={styles.chatContent} width='100%'>        
            {loading? <Loading /> : [...messages, ...newMessages].map((message) => (
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
