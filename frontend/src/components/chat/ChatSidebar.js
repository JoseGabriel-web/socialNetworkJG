import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../css/chat/chatsidebar.module.css'
import ChatSidebarUser from './ChatSidebarUser'

const ChatSidebar = () => {  
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const getAllUsersReducer = useSelector((state) => state.getAllUsersReducer)
  const { users } = getAllUsersReducer    
  
    
  
  return (
    <div className={styles.chatSidebarContainer}>                    
      <div className={styles.chatSidebarUsers}>
        {users && users.filter(sidebarUser => sidebarUser.name !== user.name ).map((sidebarUser, index) => (
          <ChatSidebarUser sidebarUser={sidebarUser} />
        ))}        
      </div>
      <div className={styles.chatSidebarSearch}>
        <input placeholder='Search Users' />
      </div>      
  </div>
  )
}

export default ChatSidebar