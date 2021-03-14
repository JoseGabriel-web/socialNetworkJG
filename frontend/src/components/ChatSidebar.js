import React, { useState, useEffect } from 'react'
import styles from '../css/chatsidebar.module.css'
import axios from 'axios'

const ChatSidebar = () => {

  const [users, setUsers] = useState([])

  useEffect(async () => {
    const { data } = await axios.get('/api/users')
    setUsers(data)
    console.log(data)
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
                  <i className='fas fa-location-arrow' />
                  <i className='fas fa-id-card' />
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