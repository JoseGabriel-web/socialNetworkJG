import React from 'react'  
import styles from '../css/homeScreen.module.css'
import Feed from '../components/Feed'

const HomeScreen = () => {
  
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeFeedContainer}>
        <Feed />
      </div>            

      {/* THIS IS TEMPORARY WILL MOVE TO ANOTHER SEPARATE COMPONENT(S) AND FIX BUGS / IMPROVE MAYBE EVEN MOVE IT TO THE LAYOUT IT SELF SO WHEN DIRECTED TO CHAT IT DOES NOT HAVE TO BE RE RENDER AS THIS WILL BE USED FOR CHATS TO. */}
      <div className={styles.feedUsersContainer}>
        <div className={styles.feedUsers}>
            <div className={styles.feedUsersHeader}>
              <h3>Here are your friends</h3>
            </div>         
            <User />        
            <User />        
            <User />        
            <User />        
            <User />        
            <User />        
            <User />        
            <User />      
        </div>      
      </div>
  
  </div>  
  )
}

export default HomeScreen

// THIS GOES WITH THE COMPONENT ABOVE.
const User = () => {
  return (
    <div className={styles.users}>
      <div className={styles.usersImg}>
        <i className='fas fa-user' />
      </div>
      <div className={styles.usersName}>
          Jose Gabriel
      </div>    
      <div className={styles.usersBtn}>
          <i className='fas fa-location-arrow' />
          <i className='fas fa-id-card' />
      </div>    
    </div>
  )
}