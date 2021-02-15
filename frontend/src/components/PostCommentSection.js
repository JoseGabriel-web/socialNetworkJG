import React, { useState } from 'react'
import styles from '../css/postCommentSection.module.css'

const PostCommentSection = ({ comments, postId }) => {
  const [label, setLabel] = useState('')
  const handleAddComment = () => {
    setLabel('')
  }

  return (
    <div className={styles.commentSectionContainer}>
      <div className={styles.commentsContainer}>
        {comments && comments.map((comment) => <h3>{comment.label}</h3>)}
      </div>
      <div className={styles.addCommentForm}>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={styles.addCommentInput}
          placeholder='Add comment..'
        />
        <div
          onClick={handleAddComment}
          className={`fas fa-plus ${styles.addCommentBtn}`}
        />
      </div>
    </div>
  )
}

export default PostCommentSection
