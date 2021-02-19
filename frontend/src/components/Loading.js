import React from 'react'
import styles from '../css/loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader} />
    </div>
  )
}

export default Loading
