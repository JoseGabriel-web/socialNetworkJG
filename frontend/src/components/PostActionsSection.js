import styles from '../css/postActionsSection.module.css'
import React from 'react'

const postActionsSection = ({ id, likes = 0}) => {
  // [] Make an array of id of posts user has liked and check if it contains this post id.
  // [] Than set the like field to true if it contains it.
  let liked;
  return (
    <div className={styles.postActionsSectionContainer}>
      <div className={styles.postInfoContainer}>
        <h3>{likes} Likes</h3>
      </div>
      <div className={styles.openPostCommentsContainer} >
        <h4>Comments</h4>
      </div>    
      <div className={styles.likePostContainer}>
        <i className={`${liked? 'fas' : 'far' } fa-heart`} />
      </div>      
      <div className={styles.sharePostContainer}>
        <i className='fas fa-share-square' />
      </div>
    </div>
  )
}

export default postActionsSection