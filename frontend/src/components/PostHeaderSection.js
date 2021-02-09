import React from 'react'
import styles from '../css/postHeaderSection.module.css'

const PostHeaderSection = ({userName}) => {
  return (
    <div className={styles.postHeader}>
      <div className={styles.postHeaderImg}>
        <i className='fas fa-user-circle' />
      </div>        
      <div className={styles.postHeaderUsername}>
        <h3>{userName}</h3>
      </div>  
    </div>
  )
}

export default PostHeaderSection
