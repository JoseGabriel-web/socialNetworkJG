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
        <Post isVideo='true' video='https://vod-progressive.akamaized.net/exp=1612767822~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3358%2F19%2F491790680%2F2211080071.mp4~hmac=65096ba6f505aa673f596379982b4436a92fca920c2acad650a045573ab08309/vimeo-prod-skyfire-std-us/01/3358/19/491790680/2211080071.mp4' />
        <Post image='https://images.pexels.com/photos/4577578/pexels-photo-4577578.jpeg?cs=srgb&dl=pexels-rachel-claire-4577578.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/2907301/pexels-photo-2907301.jpeg?cs=srgb&dl=pexels-blank-space-2907301.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/4393464/pexels-photo-4393464.jpeg?cs=srgb&dl=pexels-jan-karan-4393464.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/2405062/pexels-photo-2405062.jpeg?cs=srgb&dl=pexels-tiffany-bui-2405062.jpg&fm=jpg' />
      </div>
    </div>
  )
}

export default Feed
