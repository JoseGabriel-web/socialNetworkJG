import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { io } from 'socket.io-client'
import confgAxios from './confgAxios'
import * as userActions from './actions/userActions'
import styles from './css/layout/layout.module.css'
import Nav from './components/nav/Nav'
import HomeScreen from './screens/HomeScreen'
import Sidebar from './components/layout/Sidebar'
import ProfileScreen from './screens/ProfileScreen'
import MessagingScreen from './screens/MessagingScreen'
import { token } from './utils'

const Layout = ({ location, history }) => {    

  const dispatch = useDispatch()
  // const loginReducer = useSelector((state) => state.loginReducer)
  // const { user } = loginReducer
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer

  const updateHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }  

  // useEffect(() => {

  //   const socket = io({
  //     serveClient: false,
  //     reconnection: true
  //   })  

  //   socket.emit('userConnected', { username: user.name })
  //   socket.on('onlineUsers', ({ onlineUsernames }) => {
  //     console.log(onlineUsernames)
  //   })

  //   return () => {      
  //     socket.off()      
  //   }

  // },[location.search, user])

  // useEffect(() => {
  //   if(!user) {
  //     history.push('/login')
  //   }
  // },[user, history])
  
  useEffect(() => {
    updateHeight()         
  }, [window.innerHeight])  
  
  useEffect(() => {    
    confgAxios()
    dispatch(userActions.getUserAction())    
  }, [])  
  
  return (    
    <div className={styles.layout}>
      <div className={styles.navContainer}>
        <Nav />
      </div>
      <div className={styles.content}>
        <div className={styles.screensContainer}>        
          <Switch>
            <Route component={HomeScreen} path='/home' exact />
            <Route component={MessagingScreen} path='/messaging' exact />
            <Route component={ProfileScreen} path='/profile/:username' />
            <Redirect to='/login' />
          </Switch>                
        </div>
        <div className={styles.sidebarContainer}>
          <Sidebar />        
        </div>
      </div>                  
    </div>    
  )
}

export default Layout