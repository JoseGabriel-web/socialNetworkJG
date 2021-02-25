import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPostComment, deletePostComment } from '../actions/postCommentActions'
import styles from '../css/postCommentSection.module.css'
import defaultProfilePic from '../images/user.png'

const PostCommentSection = ({
  postId,
  isCommentSectionOpened,
  setIsCommentSectionOpened,
  comments
}) => {
  const dispatch = useDispatch()  
  const loginReducer = useSelector(state => state.loginReducer)  
  const { name } = loginReducer?.user || {name: ''}
  const [label, setLabel] = useState('')  
  const [newComments, setNewComments] = useState([])

  const handleAddComment = async (string) => {
    if(label === '') return
    const { newComment } = await dispatch(createPostComment(postId, label))
    if(newComment) setNewComments([...newComments, newComment])
    setLabel('')
    setIsCommentSectionOpened(true)
  }

  const handleLikeComment = () => {

  }  
  const handleDeleteComment = (labelToDelete) => {
    // postId, label, username
    dispatch(deletePostComment(postId, labelToDelete))
  }  

  return (
    <div className={styles.commentSectionContainer}>
      <div
        className={`${styles.commentsContainer} ${
          isCommentSectionOpened ? '' : styles.closedCommentSection
        }`}
      >
        {comments &&
          [...comments, ...newComments].map((comment, index) => (
            <div className={styles.commentContainer}>
              <div className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentHeaderProfileImg} style={{backgroundImage: comment.user.profilePicture? `url(${comment.user.profileImgUrl})` : `url(${defaultProfilePic})` }} />              
                  <h5>
                    {comment.user.name}:
                  </h5>                  
                  <i
                    className='far fa-heart'
                    onClick={() => handleLikeComment(index)}
                  />
                  {name && name === comment.user.name ? (<i
                    className='fas fa-trash-alt'
                    onClick={() => handleDeleteComment(comment.label)}
                  /> ) : null}                                    
                </div>
                <p>{comment.label}</p>
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
