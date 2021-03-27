import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../css/nav/notification.module.css'
import { socket } from '../../Layout'

const Notifications = () => {
  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer  
  const [notifications, setNotifications] = useState([])  
  const handleOnClick = (notification) => {
    console.log(notification, ' <- this should be deleted')
  }

  socket.on('receiveNotification', (notification) => {    
    setNotifications([...notifications, notification])
  })

  useEffect(() => {
    if(user) {
      setNotifications(user.notifications)
    }
  }, [user])

  return (
    <div>
      {notifications
        ? notifications.map((notification) => (
            <div className={styles.notificationContainer}>
              <Link to={notification.link} onClick={() => handleOnClick(notification)}>              
                <h4>{notification.body}</h4>
              </Link>
            </div>
          ))
        : ''}           
    </div>
  )
}

export default Notifications
