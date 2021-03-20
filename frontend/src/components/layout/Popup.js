import React from 'react'
import styles from '../../css/layout/popup.module.css'

const Popup = ({ children, isOpened }) => {  
  return (
    <div className={styles.popupContainer} style={{display: isOpened? 'flex' : 'none'}} >
      {children}
    </div>
  )
}

export default Popup
