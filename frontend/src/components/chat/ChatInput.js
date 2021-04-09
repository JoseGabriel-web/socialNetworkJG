import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chatInput.module.css'
import { socket } from '../../Layout'

const ChatInput = ({ overSpeedLimit, setOverSpeedLimit }) => {
  const chatRoomInfoReducer = useSelector(state => state.chatRoomInfoReducer)
  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer
  const { chatRoomId } = chatRoomInfoReducer
  const [body, setBody] = useState(null)
  const [messageJustSent, setMessageJustSent] = useState(false)

  const handleSendMessage = () => {
    if(messageJustSent && overSpeedLimit) {
      return
    } else if(messageJustSent) {
      setOverSpeedLimit(true)
      return setTimeout(() => {
        setOverSpeedLimit(false)
      }, 1000)      
    }
    if(body && user && chatRoomId) {
      socket.emit('sendMessage', { chatRoomId, creator: user._id, sender: user.name, body })
      setMessageJustSent(true)
      setTimeout(() => {
        setMessageJustSent(false)
      }, 1000)
      setBody('')
    }
    return
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
