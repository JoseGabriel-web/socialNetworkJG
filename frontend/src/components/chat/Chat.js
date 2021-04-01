import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chat.module.css'
import ChatInput from './ChatInput'
import ChatControllers from './ChatControllers'
import Message from './Message'
import Loading from '../layout/Loading'
import { socket } from '../../Layout'
import Popup from '../layout/Popup'

const Chat = ({ isOpened, setIsOpened, newMessages, setNewMessages }) => {
  const chatRoomInfoReducer = useSelector((state) => state.chatRoomInfoReducer)
  const [overSpeedLimit, setOverSpeedLimit] = useState(false)  
  const { messages = [], loading, chatRoomId } = chatRoomInfoReducer
  const chatRef = useRef(null)


  socket.on('receiveMessage', (newMessage) => {
    setNewMessages([...newMessages, newMessage])
  })

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }

  useEffect(() => {
    if (chatRef !== null && chatRef.current) {
      scrollToBottom()
    }
  }, [messages, newMessages])  

  return (
    <div className={styles.chatContainer}>      
      <div className={styles.chatControllers}>
        <ChatControllers isOpened={isOpened} setIsOpened={setIsOpened} />
      </div>

      <div className={styles.chatContent} width='100%' ref={chatRef}>
        {loading ? <Loading /> : (
          messages && messages.map((message) => <Message message={message} />)
        )}
        {newMessages && newMessages.map((message) => <Message message={message} />)}
            
        {(!chatRoomId && !loading) && (
          <div className={styles.chatRoomNull}>
            <i className='far fa-comments' />
          </div>
        )}
        
      </div>
      

      <div className={styles.chatInputComponentContainer}>
        <ChatInput 
          overSpeedLimit={overSpeedLimit} 
          setOverSpeedLimit={setOverSpeedLimit} 
        />
      </div>
    </div>
  )
}

export default Chat
