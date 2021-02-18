import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import styles from '../css/layout.module.css'
import Nav from '../components/Nav'
import HomeScreen from '../screens/HomeScreen'
import Sidebar from '../components/Sidebar'

const Layout = () => {  

  return (
    <div className={styles.layout}>
      <div className={styles.navContainer}>
        <Nav />
      </div>
      <div className={styles.content} style={{ overflow: 'hidden', height: '100%'}}>
        <Sidebar />
        <Switch>
          <Route component={HomeScreen} path='/' exact />
        </Switch>        
      </div>                  
    </div>
  )
}

export default Layout