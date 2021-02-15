import React from 'react'
import styles from '../css/post.module.css'
import PostCommentSection from './PostCommentSection'
import PostActionsSection from './PostActionsSection'
import PostMediaSection from './PostMediaSection'
import PostHeaderSection from './PostHeaderSection'
import PostDescriptionSection from './PostDescriptionSection'

const Post = ({user, title, description, image, video, likes, postId, comments}) => {  
  return (
    <div className={styles.postContainer}>      
      <div className={styles.postHeaderSectionContainer}>
        <PostHeaderSection userId={user._id} username={user.username} public_id={image.public_id} postId={postId} />
      </div>
      <div className={styles.postBody}>
        <div className={styles.postMediaSectionContainer}>
          <PostMediaSection video={video} image={image.url} />
        </div>        
        <div className={styles.postActionSectionContainer}>
      <div className={styles.postDescriptionSectionContainer}>
        <PostDescriptionSection title={title} description={description} />   
      </div>
          <PostActionsSection user={user} postId={postId} likes={likes} />   
        </div>
        <div className={styles.postCommentSectionContainer}>
          <PostCommentSection comments={comments} postId={postId} />   
        </div>
      </div>   
    </div>
  )
}

export default Post
