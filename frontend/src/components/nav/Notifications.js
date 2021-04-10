import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../../css/nav/notification.module.css"
import { socket } from "../../Layout"
import * as userConstants from "../../constants/userConstants"

const Notifications = () => {
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const dispatch = useDispatch()
  const [notifications, setNotifications] = useState([])

  const handleOnClick = (notification) => {
    if(user) {
      handleDeleteNotification(notification)
      dispatch({
        type: userConstants.GET_USER_INFO_SUCCESS,
        payload: {
          ...user,
          notifications: notifications.filter((noti) => noti._id !== notification._id),
        },
      })
      console.log(notifications.filter((noti) => noti._id !== notification._id))
    }
  }

  const handleDeleteNotification = (notification) => {
    socket.emit("deleteNotification", { notificationId: notification._id })
  }

  socket.on("receiveNotification", (notification) => {        
    setNotifications([...notifications, notification])
  })

  useEffect(() => {
    if (user) {
      setNotifications(user.notifications)
    }
  }, [user])

  return (
    <div>
      {notifications
        ? notifications.map((notification) => (
            <div className={styles.notificationContainer}>
              <Link
                to={notification.link}
                onClick={() => handleOnClick(notification)}
              >
                <h4>{notification.body}</h4>
              </Link>
            </div>
          ))
        : ""}
    </div>
  )
}

export default Notifications
