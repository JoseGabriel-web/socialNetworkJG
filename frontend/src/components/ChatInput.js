import React, { useState } from 'react'
import styles from '../css/chatInput.module.css'

const ChatInput = () => {

  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    
  }

  return (
    <div className={styles.chatInputContainer}>
      <input value={message} onChange={(e) => setMessage(e.target.value)} className={styles.chatInput} />
      <div className={styles.sendMessageBtn}>
        <i className='fas fa-location-arrow' />
      </div>
    </div>
  )
}

export default ChatInput
