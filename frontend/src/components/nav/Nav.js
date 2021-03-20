import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultProfilePicture from '../../images/user.png'
import Notification from './Notification'
import styles from '../../css/nav/nav.module.css'
import { USER_LOGIN_FAIL } from '../../constants/userConstants'
// import logo from '../images/logo_transparent.png'
// import logo from '../images/logoCropped.png'

const Nav = () => {
  const [userNavMenuState, setUserNavMenuState] = useState(false)
  const [userNavNotState, setUserNavNotState] = useState(false)
  const loginReducer = useSelector((state) => state.loginReducer) || { user: { profilePicture: null} }
  const { user } = loginReducer
  const { user: { profilePicture } } = loginReducer  
  const updateProfilePictureReducer = useSelector(
    (state) => state.updateProfilePictureReducer
    )
    const { updatedProfilePicture } = updateProfilePictureReducer
    const ref = useRef(null)  
  const dispatch = useDispatch()  

  const replaceSpace = (string) => {
    return string.split(' ').join('+')
  }

  const handleLogout = () => {    
    localStorage.removeItem('user')
    dispatch({ type: USER_LOGIN_FAIL })
    window.location.href = '/login'
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
  }  

  useEffect(() => {
    if (ref === null) return
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  return (
    <div className={styles.navContianer}>
      <div className={styles.nav}>
        <Link to='/home' className={styles.logoContainer}>
          {/* <img height='auto' alt='logo' src={logo} />                     */}
        </Link>

        <div className={styles.spacer} />

        <div className={styles.menu} ref={ref}>
          <div className={styles.searchContainer}>
            <input type='text' placeholder='Search...' />
          </div>

          <div className={styles.userNav}>
            <div onClick={handleNotMenuOpen} className={styles.userNavBtn}>
              <i className='far fa-bell' />
            </div>
            <div
              className={
                userNavNotState
                  ? styles.userNavNotificationContainer
                  : styles.displayNone
              }
            >
              {user ? (
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
                  <div
                    className={styles.notificationHeader}
                    style={{ borderBottom: 'none' }}
                  >
                    <h4>Please log in, to view notifications.</h4>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.userNav}>
            <div onClick={handleUserMenuOpen} className={styles.userNavBtn}>              
              <div
                className={styles.profilePicture}
                style={{
                  backgroundImage: `url(${
                    updatedProfilePicture
                      ? updatedProfilePicture.url
                      : profilePicture && profilePicture.url
                      ? profilePicture.url
                      : defaultProfilePicture
                  })`,
                }}
              />
            </div>
            <ul
              className={
                userNavMenuState ? styles.userNavOptions : styles.displayNone
              }
            >
              {user ? (
                <>
                  <Link to={`/profile/${replaceSpace(user.name)}/gallery`}>
                    <i className='fas fa-user' />
                    <h4>Profile</h4>
                  </Link>
                  <Link to={`/profile/${replaceSpace(user.name)}/settings`}>
                    <i className='fas fa-user-cog' />
                    <h4>Settings</h4>
                  </Link>
                  <div className={styles.logoutBtn} onClick={handleLogout}>
                    <i className='fas fa-user-cog' />
                    <h4>Log out</h4>
                  </div>
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
