import React, { useState } from 'react'
import styles from '../../css/layout/sidebar.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sidebarData } from '../../data/sidebarData'
import * as utils from '../../utils/index'

const Sidebar = () => {
  const [sidebarState, setSidebarState] = useState(true)
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer

  const handleSidebarState = () => {
    setSidebarState(!sidebarState)
  }

  const profileUrlFormatter = (user, section) => {
    return `/profile/${utils.string.replaceSpace(user.name)}/` + section
  }

  const isSelected = (path) => {
    if(path === '/profile' && window.location.pathname.includes('/settings')) return false
    return window.location.pathname.includes(path) ? true : false
  }

  return (
    <div className={styles.sidebarContianer}>
      <div>
        <div className={styles.mobile}>
          {sidebarData.map((tab) => (
            <Link
              key={`${tab.path}`}
              to={
                tab.path === '/profile' && user
                  ? profileUrlFormatter(user, 'gallery')
                  : tab.path === '/settings' && user
                  ? profileUrlFormatter(user, 'settings')
                  : tab.path
                }
              className={`${styles.sidebarTab} ${
                isSelected(tab.path) ? styles.active : ''
              }`}
            >
              <div className={styles.tabIcon}>
                <i className={`${tab.icon}`} />
              </div>

              <div               
                className={`${styles.tabLabel} ${sidebarState && styles.closeSidebarLabel}`}
              >
                <h3>{tab.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.handleSidebarIcon} onClick={handleSidebarState}>
        <i
          className={`${
            sidebarState
              ? 'fas fa-angle-double-right'
              : 'fas fa-angle-double-left'
          } ${sidebarState ? styles.goLeft : styles.goRight}`}
        />
      </div>
    </div>
  )
}

export default Sidebar
