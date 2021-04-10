import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from '../../css/chat/chatControllers.module.css'
import Loading from '../layout/Loading'
import { string } from '../../utils/index'

const ChatControllers = ({ isOpened, setIsOpened }) => {
  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer
  const chatRoomInfoReducer = useSelector(state => state.chatRoomInfoReducer)
  const { users, loading } = chatRoomInfoReducer

  return (
    <div className={styles.chatControllersContainer}>
      
      <div className={styles.chatSidebarController}>     
        <div onClick={() => setIsOpened(!isOpened)}>  
          <i className='fas fa-users' />        
        </div>   
      </div>

      <div className={styles.chatCurrentRoomUsers}>
        { users && user? users.filter(username => username !== user.name).map(username => (
          <Link to={`/profile/${string.replaceSpace(username)}/gallery`}>          
            <h2 className={styles.chatUsername}>{username}</h2>
          </Link>
        )) : loading? (
          <div styles={{height: '100%', padding: '1rem'}}>
            <Loading small={true} />
          </div>
        ) : (
          <h2>select chat room</h2> 
          ) 
        }
      </div>

    </div>
  )
}

export default ChatControllers
