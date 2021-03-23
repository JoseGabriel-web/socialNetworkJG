import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../css/chat/chatsidebar.module.css'
import * as utils from '../../utils/index'

const ChatSidebar = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    
  }, [])

  return (
    <div className={styles.chatSidebarContainer}>                    
      <div className={styles.chatSidebarUsers}>
        {users && users.map((user, index) => (
          <div>
            <div className={styles.chatSidebarUser}>
              <div className={styles.chatSidebarUserImg} style={{backgroundImage: `url(${user.profilePicture.url})`}} />
              <div className={styles.chatSidebarUserName}>
                  {user.name}
              </div>    
              <div className={styles.chatSidebarUserBtns}>                  
                  <Link to={`/profile/${utils.string.replaceSpace(user.name)}/gallery`} className='fas fa-portrait' />
              </div>    
            </div>
          </div>
        ))}        
      </div>
      <div className={styles.chatSidebarSearch}>
        <input placeholder='Search Users' />
      </div>      
  </div>
  )
}

export default ChatSidebar