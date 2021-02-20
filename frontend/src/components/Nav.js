import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification'
import styles from '../css/nav.module.css'

const Nav = () => {
  const [userNavMenuState, setUserNavMenuState] = useState(false)
  const [userNavNotState, setUserNavNotState] = useState(false)  
  const loginReducer = useSelector((state) => state.loginReducer)
  const { user } = loginReducer  
  const ref = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('user')
  }

  const handleUserMenuOpen = () => {
    setUserNavNotState(false)
    setUserNavMenuState(!userNavMenuState)
  }
  
  const handleNotMenuOpen = () => {
    setUserNavMenuState(false)
    setUserNavNotState(!userNavNotState)
  }

  const handleCloseAllMenu = () => {
    setUserNavMenuState(false)
    setUserNavNotState(false)
  }

  
  const handleClickOutside = (event) => {    
    if (ref && !ref?.current?.contains(event.target)) {
        handleCloseAllMenu()        
    }
  };

  useEffect(() => {
    const functions = {
      startingFunction: () => {
        if(ref === null) return
        document.addEventListener('click', handleClickOutside, true)
      },
      cleanUp: () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }

    functions.startingFunction()
    return functions.cleanUp()  
  });

  return (
    <div className={styles.navContianer}  >
      <div className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link to='/home'><h2>Logo</h2></Link>
        </div>

        <div className={styles.spacer} />

        <div className={styles.menu} ref={ref}>

      <div className={styles.searchContainer}>
        <input type='text' placeholder='Search...' />
      </div>          

          <div className={styles.userNav}>
            <div
              onClick={handleNotMenuOpen}
              className={styles.userNavBtn}
            >              
              <i className='fas fa-bell' />              
            </div>
            <div
              className={
                userNavNotState ? styles.userNavNotificationContainer : styles.displayNone
              }              
            >
              {user? (
                <>
                  <div className={styles.notificationHeader}>
                    <h4>Notifications:</h4>
                  </div>
                  <div className={styles.userNotificationsContainer}>
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                    <Notification label='This is a Notification Component' /> 
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.notificationHeader} style={{borderBottom: 'none'}}>
                    <h4>Please log in, to view notifications.</h4>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.userNav}>
            <div
              onClick={handleUserMenuOpen}
              className={styles.userNavBtn}
            >              
              <i className='fas fa-user-circle' />              
            </div>
            <ul              
              className={
                userNavMenuState ? styles.userNavOptions : styles.displayNone
              }              
            >
              {user ? (
                <>
                  <Link to='/profile'>
                    <i className='fas fa-user' />
                    <h4>Profile</h4>
                  </Link>
                  <Link to='/settings'>
                    <i className='fas fa-user-cog' />
                    <h4>Settings</h4>
                  </Link>
                  <Link to='/logout' onClick={handleLogout}>
                    <i className='fas fa-user-cog' />
                    <h4>Log out</h4>
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/login'>
                    <i className='fas fa-user' />
                    <h3>Log in</h3>
                  </Link>
                  <Link to='/register'>
                    <i className='fas fa-user-cog' />
                    <h3>Sign Up</h3>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
