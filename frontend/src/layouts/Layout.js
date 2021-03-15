import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import styles from '../css/layout.module.css'
import Nav from '../components/Nav'
import HomeScreen from '../screens/HomeScreen'
import Sidebar from '../components/Sidebar'
import ProfileScreen from '../screens/ProfileScreen'
import MessagingScreen from '../screens/MessagingScreen'

const Layout = () => {  

  const updateHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', updateHeight())
  
  useEffect(() => {
    updateHeight()      
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