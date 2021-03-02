import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createPostComment,
  deletePostComment,
} from '../actions/postCommentActions'
import styles from '../css/postCommentSection.module.css'
import defaultProfilePic from '../images/user.png'

const PostCommentSection = ({
  postId,
  isCommentSectionOpened,
  setIsCommentSectionOpened,
  comments,
}) => {
  const dispatch = useDispatch()
  const loginReducer = useSelector((state) => state.loginReducer)
  const { name } = loginReducer?.user || { name: '' }
  const [label, setLabel] = useState('')
  const [initialComments, setInitialComments] = useState([...comments])
  const [newComments, setNewComments] = useState([])
  const [updatedComments, setUpdatedComments] = useState([
    ...initialComments,
    ...newComments,
  ])

  const handleAddComment = async () => {
    if (label === '') return
    const { newComment } = await dispatch(createPostComment(postId, label))
    if (newComment) {
      setUpdatedComments([...initialComments, ...newComments, newComment])
      setNewComments([...newComments, newComment])
    }
    setLabel('')
    setIsCommentSectionOpened(true)
  }

  const handleLikeComment =  () => {}

  const handleDeleteComment = async (labelToDelete) => {
    const { isDeleted } = await dispatch(deletePostComment(postId, labelToDelete))
    if(isDeleted) {
      setNewComments(
        newComments.filter((comment) => comment.label !== labelToDelete)
      )
      setInitialComments(
        initialComments.filter((comment) => comment.label !== labelToDelete)
      )
      setUpdatedComments([
        ...initialComments.filter((comment) => comment.label !== labelToDelete),
        ...newComments.filter((comment) => comment.label !== labelToDelete),
      ])
    }
  }

  useEffect(() => {
    setUpdatedComments([...comments])
  }, [])

  return (
    <div className={styles.commentSectionContainer}>
      <div
        className={`${styles.commentsContainer} ${
          isCommentSectionOpened ? '' : styles.closedCommentSection
        }`}
      >
        {comments &&
          updatedComments.map((comment, index) => (
            <div className={styles.commentContainer}>
              <div className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div
                    className={styles.commentHeaderProfileImg}
                    style={{
                      backgroundImage: comment.user.profilePicture
                        ? `url(${comment.user.profilePicture})`
                        : `url(${defaultProfilePic})`,
                    }}
                  />
                  <h5>{comment.user.name}:</h5>
                  <i
                    className='far fa-heart'
                    onClick={() => handleLikeComment(index)}
                  />
                  {name && name === comment.user.name ? (
                    <i
                      className='fas fa-trash-alt'
                      onClick={() => handleDeleteComment(comment.label)}
                    />
                  ) : null}
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
