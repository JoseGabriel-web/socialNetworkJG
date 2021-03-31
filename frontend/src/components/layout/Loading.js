import React from 'react'
import styles from '../../css/layout/loading.module.css'

const Loading = ({ small }) => {
  return (
    <div className={styles.loadingContainer}>      
      <div className={small? styles.loadingSmall : styles.loading} />
    </div>
  )
}

export default Loading
