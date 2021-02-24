import React, { useState } from 'react'
import styles from '../css/postCommentSection.module.css'
// comments, postId
const PostCommentSection = ({ postId, isCommentSectionOpened, setIsCommentSectionOpened }) => {  
  const [label, setLabel] = useState('')
  const [comments, setComments] = useState([])

  const handleAddComment = (string) => {
    setComments([...comments, { label, username: 'Jose Gabriel', likes: [] }])
    setLabel('')
  }

  const handleLikeComment = () => {

  }

  return (
    <div className={styles.commentSectionContainer}>
      <div className={styles.commentsContainer}>
        {comments &&
          comments.map((comment, index) => (
            <div className={styles.commentContainer} style={{display: isCommentSectionOpened? 'block' : 'none'}}>
              <div className={styles.comment}>
                <h5>{comment.username}:</h5>
                <p>{comment.label}</p>
                <i
                  className='far fa-heart'
                  onClick={() => handleLikeComment(index)}
                />
              </div>
            </div>
          ))}
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
