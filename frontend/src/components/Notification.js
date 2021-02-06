import React from 'react'
import styles from '../css/notification.module.css'

const Notification = ({label}) => {
  return (
    <div className={styles.notificationContainer}>
      <h4>      
        {label}
      </h4>
    </div>
  )
}

export default Notification
