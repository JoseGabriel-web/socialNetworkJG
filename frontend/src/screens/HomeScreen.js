import React from 'react'  
import styles from '../css/homeScreen.module.css'
import Feed from '../components/Feed'

const HomeScreen = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeFeedContainer}>
        <Feed />
      </div>      
      
    </div>
  )
}

export default HomeScreen
