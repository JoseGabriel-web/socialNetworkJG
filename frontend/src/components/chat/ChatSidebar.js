import React, { useState } from "react"
import { useSelector } from "react-redux"
import styles from "../../css/chat/chatsidebar.module.css"
import Loading from "../layout/Loading"
import ChatSidebarUser from "./ChatSidebarUser"

const ChatSidebar = ({ setNewMessages, setIsOpened }) => {
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const getAllUsersReducer = useSelector((state) => state.getAllUsersReducer)
  const { user } = userInfoReducer
  const { users } = getAllUsersReducer
  const [filter, setFilter] = useState()

  const inputFilter = (sidebarUser) => {    
    if(!filter || sidebarUser.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
      return true
    }
    return false
  }   

  return (
    <div className={styles.chatSidebarContainer}>
      <div className={styles.chatSidebarUsers}>
        {users ? (
          users
            .filter((sidebarUser) => sidebarUser.name !== user.name)
            .filter((sidebarUser) => inputFilter(sidebarUser))
            .map((sidebarUser) => (
              <ChatSidebarUser
                setNewMessages={setNewMessages}
                sidebarUser={sidebarUser}
                setIsOpened={setIsOpened}
              />
            ))
        ) : (
          <Loading />
        )}
      </div>
      <div className={styles.chatSidebarSearch}>
        <input
          placeholder='Search Users'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ChatSidebar
