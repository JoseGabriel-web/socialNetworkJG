import React, { useState } from 'react'
import styles from '../css/sidebar.module.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sidebarData } from '../data/sidebarData'

const Sidebar = () => {  
  
  const [sidebarState, setSidebarState] = useState(true)  
  const loginReducer = useSelector((state) => state.loginReducer)
  const { user } = loginReducer

  const handleSidebarState = () => {
    setSidebarState(!sidebarState)
  }    

  const isSelected = (path) => {
    return window.location.pathname === path? true : false
  }
  
  return (
    <div className={styles.sidebarContianer}>
      <div>        

        <div className={styles.mobile} >
          {sidebarData.map((tab) => (
            <Link                
              key={`${tab.path}`}
              to={`${tab.path}${tab.path === '/profile' && user? '/' + user.name : ''}`}
              className={`${styles.sidebarTab} ${isSelected(tab.path)? styles.active : ''}`}
            >
              <div className={styles.tabIcon}>
                <i className={`${tab.icon}`} />
              </div>

              <div
                style={{display: sidebarState && window.innerWidth > 762? 'flex' : 'none'}}
                className={styles.tabLabel}                
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
          } ${sidebarState?  styles.goLeft : styles.goRight}`}          
        />
      </div>
    </div>
  )
}

export default Sidebar
