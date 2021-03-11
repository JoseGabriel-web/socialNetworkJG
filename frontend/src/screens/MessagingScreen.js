import React, { useState } from 'react'
import styles from '../css/messagingScreen.module.css'
import ChatSidebar from '../components/ChatSidebar'

const MessagingScreen = () => {
  const [isOpened, setIsOpened] = useState(true)
  

  return (
    <div className={styles.messagingScreenConatiner}>
      <div className={styles.chatComponentContainer}>
        <button onClick={() => setIsOpened(!isOpened)}>handle sidebar</button>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
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
