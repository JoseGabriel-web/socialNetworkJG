import React from 'react'
import styles from '../css/post.module.css'
import PostCommentSection from './PostCommentSection'
import PostActionsSection from './PostActionsSection'
import PostMediaSection from './PostMediaSection'
import PostHeaderSection from './PostHeaderSection'
import PostDescriptionSection from './PostDescriptionSection'

const Post = ({userName, title, description, image, video, likes, id, comments}) => {
  return (
    <div className={styles.postContainer}>      
      <div className={styles.postHeaderSectionContainer}>
        <PostHeaderSection userName={userName} />
      </div>
        <div className={styles.postDescriptionSectionContainer}>
          <PostDescriptionSection title={title} description={description} />   
        </div>
      <div className={styles.postBody}>
        <div className={styles.postMediaSectionContainer}>
          <PostMediaSection video={video} image={image} />
        </div>        
        <div className={styles.postActionSectionContainer}>
          <PostActionsSection id={id} likes={likes} />   
        </div>
        <div className={styles.postCommentSectionContainer}>
          <PostCommentSection comments={comments} id={id} />   
        </div>
      </div>   
    </div>
  )
}

export default Post
