import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chat.module.css'
import ChatInput from './ChatInput'
import Message from './Message'
import Loading from '../layout/Loading'
import { socket } from '../../Layout'

const Chat = ({ isOpened, setIsOpened, newMessages, setNewMessages }) => {
  const chatRoomInfoReducer = useSelector((state) => state.chatRoomInfoReducer)
  const [overSpeedLimit, setOverSpeedLimit] = useState(false)
  const { messages = [], loading } = chatRoomInfoReducer
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
      <div
        onClick={() => setIsOpened(!isOpened)}
        className={`${styles.handleChatSidebarBtn} fas fa-angle-double-${
          isOpened ? 'right' : 'left'
        }`}
      />

      <div className={styles.chatContent} width='100%' ref={chatRef}>
        {loading ? (
          <Loading />
        ) : (
          messages && messages.map((message) => <Message message={message} />)
        )}
        {newMessages &&
          newMessages.map((message) => <Message message={message} />)}                            
      </div>

      {overSpeedLimit ? (
        <h1 style={{ position: 'absolute', top: '50%', left: '50%' }}>
          Please allow 1 sec.
        </h1>
      ) : null}

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
