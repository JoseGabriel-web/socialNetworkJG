import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChatRoom } from "../../actions/chatRoomActions"
import { socket } from "../../Layout"
import { Link } from "react-router-dom"
import defaultProfilePicture from "../../images/user.png"
import styles from "../../css/chat/chatSidebarUser.module.css"
import * as utils from "../../utils/index"
import useLazyImg from "../../hooks/useLazyImg"

const ChatSidebarUser = ({ sidebarUser, setNewMessages, setIsOpened }) => {
  const dispatch = useDispatch()
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const [notificationCount, setNotificationCount] = useState(0)
  const { user } = userInfoReducer
  const loadedImg = useLazyImg(sidebarUser.profilePicture.url)

  socket.on("messageNotification", (sender) => {
    if (sender === sidebarUser.name) {
      setNotificationCount(notificationCount + 1)
    }
  })

  const getUserChatRoom = (sidebarUser) => {
    let users = [
      { name: user.name, userId: user._id },
      { name: sidebarUser.name, userId: sidebarUser._id },
    ]
    dispatch(
      getChatRoom(users)
    )
  }

  const handleOnClick = () => {
    setNewMessages([])
    getUserChatRoom(sidebarUser)
    setNotificationCount(0)
    if(window.innerWidth < 1000) {
      setIsOpened(false)
    }
  }  

  return (
    <div style={{ cursor: "pointer" }} onClick={handleOnClick}>
      <div className={styles.chatSidebarUser}>
        <div
          className={styles.chatSidebarUserImg}
          style={{
            backgroundImage: `url(${ loadedImg || defaultProfilePicture })`,
          }}
        />
        <div className={styles.chatSidebarUserName}>{sidebarUser.name}</div>
        {notificationCount > 0 ? (
          <div style={{ paddingLeft: "10px" }}>{notificationCount}</div>
        ) : (
          ""
        )}
        <div className={styles.chatSidebarUserBtns}>
          <Link
            to={`/profile/${utils.string.replaceSpace(
              sidebarUser.name
            )}/gallery`}
            className='fas fa-portrait'
          />
        </div>
      </div>
    </div>
  )
}

export default ChatSidebarUser
