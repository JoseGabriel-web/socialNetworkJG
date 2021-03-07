import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import styles from '../css/layout.module.css'
import Nav from '../components/Nav'
import HomeScreen from '../screens/HomeScreen'
import Sidebar from '../components/Sidebar'
import ChatSidebar from '../components/ChatSidebar'
import ProfileScreen from '../screens/ProfileScreen'

const Layout = () => {  

  return (
    <div className={styles.layout}>
      <div className={styles.navContainer}>
        <Nav />
      </div>
      <div className={styles.content} style={{ overflow: 'hidden', height: '100%'}}>
        <Sidebar />
        <div className={styles.variableComponets}>
          <Switch>
            <Route component={HomeScreen} path='/home' exact />
            <Route component={ProfileScreen} path='/profile/:username' />
          </Switch>        
        </div>
        <Switch>
          <Route path={['/home', '/messages']} component={ChatSidebar} />
        </Switch>
      </div>                  
    </div>
  )
}

export default Layout