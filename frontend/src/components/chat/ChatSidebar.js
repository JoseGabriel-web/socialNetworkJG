import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatRoom } from '../../actions/chatRoomActions'
import { Link } from 'react-router-dom'
import styles from '../../css/chat/chatsidebar.module.css'
import * as utils from '../../utils/index'

const ChatSidebar = () => {
  const dispatch = useDispatch()
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const getAllUsersReducer = useSelector((state) => state.getAllUsersReducer)
  const { users } = getAllUsersReducer
  
  const getUserChatRoom = (sidebarUsername) => {
    dispatch(getChatRoom([user.name, sidebarUsername]))
  }

  return (
    <div className={styles.chatSidebarContainer}>                    
      <div className={styles.chatSidebarUsers}>
        {users && users.filter(sidebarUser => sidebarUser.name !== user.name ).map((user, index) => (
          <div style={{ cursor: 'pointer' }} onClick={() => getUserChatRoom(user.name)}>
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