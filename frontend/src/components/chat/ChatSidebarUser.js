import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChatRoom } from '../../actions/chatRoomActions'
import { socket } from '../../Layout'
import { Link } from 'react-router-dom'
import defaultProfilePicture from '../../images/user.png'
import styles from '../../css/chat/chatSidebarUser.module.css'
import * as utils from '../../utils/index'

const ChatSidebarUser = ({ sidebarUser, setNewMessages }) => {  
  const dispatch = useDispatch()     
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const [notificationCount, setNotificationCount] = useState(0)

  socket.on('messageNotification', (sender) => {
    console.log('Jose veloo aqui -> ', sender)
    if(sender === sidebarUser.name) {
      console.log('Jose veloo aqui -> ', sender)
      setNotificationCount(notificationCount + 1)
    }
  })

  const getUserChatRoom = (sidebarUsername) => {
    dispatch(getChatRoom([user.name, sidebarUsername]))
  }

  const handleOnClick = () => {
    setNewMessages([])
    getUserChatRoom(sidebarUser.name)
    setNotificationCount(0)
  }
  
  return (
    <div style={{ cursor: 'pointer' }} onClick={handleOnClick}>
      <div className={styles.chatSidebarUser}>
        <div className={styles.chatSidebarUserImg} style={{backgroundImage: `url(${sidebarUser.profilePicture.url? sidebarUser.profilePicture.url : defaultProfilePicture})`}} />
        <div className={styles.chatSidebarUserName}>            
          {sidebarUser.name}            
        </div>    
        {notificationCount > 0 ? (
          <div style={{paddingLeft: '10px'}}>{notificationCount}</div> 
        ) : ''}
        <div className={styles.chatSidebarUserBtns}>                  
            <Link to={`/profile/${utils.string.replaceSpace(sidebarUser.name)}/gallery`} className='fas fa-portrait' />
        </div>    
      </div>
    </div> 
  )
}

export default ChatSidebarUser
