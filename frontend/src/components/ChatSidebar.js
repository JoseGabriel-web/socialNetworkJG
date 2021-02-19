import React from 'react'
import styles from '../css/chatsidebar.module.css'

const ChatSidebar = () => {

  const users = [{name: 'Jose Gabriel'}]

  return (
    <div className={styles.chatSidebarContainer}>                    
      <div className={styles.chatSidebarUsers}>
        {users.map((user, index) => (
          <div>
            <div className={styles.chatSidebarUser}>
              <div className={styles.chatSidebarUserImg}>
                <i className='fas fa-user' />
              </div>
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