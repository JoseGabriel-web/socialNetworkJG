import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import Post from './Post'
import styles from '../css/feed.module.css'

const Feed = () => {

  

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedCreatePostContainer}>
        <CreatePost />
      </div>

      <div className={styles.postsContainer}>
        
      </div>
    </div>
  )
}

export default Feed
