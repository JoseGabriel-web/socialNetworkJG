import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styles from '../css/layout.module.css'
import Nav from '../components/Nav'
import HomeScreen from '../screens/HomeScreen'

const Layout = () => {
  return ( 
    <div className={styles.layout}>   
      <div className={styles.navContainer}>        
        <Nav />
      </div>     
      <Switch>        
        <Route component={HomeScreen} path='/' exact />
      </Switch>    
    </div>    
  )
}

export default Layout
