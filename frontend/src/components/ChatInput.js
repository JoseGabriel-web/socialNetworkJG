import React from 'react'
import styles from '../css/chatInput.module.css'

const ChatInput = () => {
  return (
    <div className={styles.chatInputContainer}>
      <input className={styles.chatInput} />
      <div className={styles.sendMessageBtn}>
        <i className='fas fa-location-arrow' />
      </div>
    </div>
  )
}

export default ChatInput
