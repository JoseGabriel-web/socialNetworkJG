import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chatInput.module.css'
import { socket } from '../../Layout'

const ChatInput = () => {
  const chatRoomInfoReducer = useSelector(state => state.chatRoomInfoReducer)
  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer
  const { chatRoomId } = chatRoomInfoReducer
  const [body, setBody] = useState(null)

  const handleSendMessage = () => {
    if(body && user) {        
      socket.emit('sendMessage', { chatRoomId, sender: user.name, body })
      setBody('')
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className={styles.chatInputContainer}>
      <input onKeyDown={handleKeyDown} value={body} onChange={(e) => setBody(e.target.value)} className={styles.chatInput} />
      <div className={styles.sendMessageBtn} onClick={() => handleSendMessage()}>
        <i className='fas fa-location-arrow' />
      </div>
    </div>
  )
}

export default ChatInput
