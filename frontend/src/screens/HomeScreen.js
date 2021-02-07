import React from 'react'
import styles from '../css/homeScreen.module.css'
import HomeSidebar from '../components/HomeSidebar'
import Feed from '../components/Feed'

const HomeScreen = () => {
  return (
    <div className={styles.homeContainer}>
      
      <div className={styles.homeSidebarContainer}>
        <HomeSidebar />
      </div>
            
      <div className={styles.homeFeedContainer}>
        <Feed />
      </div>
      
    </div>
  )
}

export default HomeScreen
