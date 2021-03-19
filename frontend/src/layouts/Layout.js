import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { io } from 'socket.io-client'
import styles from '../css/layout.module.css'
import Nav from '../components/Nav'
import HomeScreen from '../screens/HomeScreen'
import Sidebar from '../components/Sidebar'
import ProfileScreen from '../screens/ProfileScreen'
import MessagingScreen from '../screens/MessagingScreen'

const Layout = ({ location, history }) => {    

  const loginReducer = useSelector((state) => state.loginReducer)
  const { user } = loginReducer

  const updateHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }  

  useEffect(() => {

    const socket = io({
      serveClient: false
    })  

    socket.emit('userConnected', { username: user.name })
    socket.on('onlineUsers', ({ onlineUsernames }) => {
      console.log(onlineUsernames)
    })

    return () => {      
      socket.off()      
    }

  },[location.search, user])

  useEffect(() => {
    if(!user) {
      history.push('/login')
    }
  },[user, history])
  
  useEffect(() => {
    updateHeight()         
  }, [window.innerHeight])  

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