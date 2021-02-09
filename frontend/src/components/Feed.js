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

      <div className={styles.feedPostsContainer}>
        <Post userName={'Jose'} comments={[]} id={''} likes={9} video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' />
        <Post image='https://images.pexels.com/photos/4577578/pexels-photo-4577578.jpeg?cs=srgb&dl=pexels-rachel-claire-4577578.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/2907301/pexels-photo-2907301.jpeg?cs=srgb&dl=pexels-blank-space-2907301.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/4393464/pexels-photo-4393464.jpeg?cs=srgb&dl=pexels-jan-karan-4393464.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/2405062/pexels-photo-2405062.jpeg?cs=srgb&dl=pexels-tiffany-bui-2405062.jpg&fm=jpg' />
      </div>
    </div>
  )
}

export default Feed
