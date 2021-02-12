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
        <Post title='First post ever' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin placerat ante non sem dignissim suscipit. Nulla faucibus libero sit amet luctus gravida. Morbi dictum cursus nulla, vitae pretium odio tempor iaculis. Proin tristique sed ipsum ac dictum. Donec a commodo metus. In hac habitasse platea dictumst.' userName={'Jose'} comments={[]} id={''} likes={9} video='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' />

        <Post description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin placerat ante non sem dignissim suscipit. Nulla faucibus libero sit amet luctus gravida. Morbi dictum' image='https://images.pexels.com/photos/4577578/pexels-photo-4577578.jpeg?cs=srgb&dl=pexels-rachel-claire-4577578.jpg&fm=jpg' />
        <Post title='This is the third Post!!' image='https://images.pexels.com/photos/2907301/pexels-photo-2907301.jpeg?cs=srgb&dl=pexels-blank-space-2907301.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/4393464/pexels-photo-4393464.jpeg?cs=srgb&dl=pexels-jan-karan-4393464.jpg&fm=jpg' />
        <Post image='https://images.pexels.com/photos/2405062/pexels-photo-2405062.jpeg?cs=srgb&dl=pexels-tiffany-bui-2405062.jpg&fm=jpg' />
      </div>
    </div>
  )
}

export default Feed
