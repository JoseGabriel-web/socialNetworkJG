import React, { useState, useEffect, useRef } from 'react'
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
  const chatRef = useRef(null)

  socket.on('receiveMessage', (newMessage) => {    
    setNewMessages([...newMessages, newMessage])
  })

  const scrollToBottom = () => {    
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }

  useEffect(() => {
    if(chatRef !== null && chatRef.current) {
      scrollToBottom()
    }
  }, [messages, newMessages])

  return (
    <div className={styles.chatContainer}>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className={`${styles.handleChatSidebarBtn} fas fa-angle-double-${
          isOpened ? 'right' : 'left'
        }`}
      />  
      
          <div className={styles.chatContent} width='100%' ref={chatRef} >        
            {loading? <Loading /> :  messages && messages.map((message) => (
              <Message message={message} />
            ))}
            {newMessages && newMessages.map(message => (
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
