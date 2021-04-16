import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { io } from 'socket.io-client'
import confgAxios from './confgAxios'
import * as userActions from './actions/userActions'
import styles from './css/layout/layout.module.css'
import Nav from './components/nav/Nav'
import NotFound from './screens/NotFoundScreen'
import HomeScreen from './screens/HomeScreen'
import Sidebar from './components/layout/Sidebar'
import ProfileScreen from './screens/ProfileScreen'
import MessagingScreen from './screens/MessagingScreen'
export const socket = io({
  serveClient: false,
  reconnection: true
})  

const Layout = ({ location }) => {    

  const dispatch = useDispatch()
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer  

  const updateHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  

  useEffect(() => {
    if(user) {             
      socket.emit('userConnected', { username: user.name })
      socket.on('onlineUsers', ({ onlineUsernames }) => {
        console.log(onlineUsernames)
      }) 
      return () => {   
        socket.off()
      }
    }
  },[location.search, user])      

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight) 
  }, [])
  
  useEffect(() => {
    updateHeight()  
  }, [])  
  
  useEffect(() => {    
    confgAxios()
    dispatch(userActions.getUserAction())    
  }, [])  
  
  useEffect(() => {    
    if(!user) {
      dispatch(userActions.getUserAction())   
    }
  }, [user])  
  
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
            <Route component={NotFound} path='/notfound' />            
            <Redirect to='/notfound' />
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