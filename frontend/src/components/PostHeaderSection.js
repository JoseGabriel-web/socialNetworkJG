import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/postHeaderSection.module.css'
import { deletePost } from '../actions/postActions'

const PostHeaderSection = ({ userId, postId, public_id, username }) => {
  const [confirmDeletePost, setConfirmDeletePost] = useState(false)
  const loginReducer = useSelector(state => state.loginReducer)
  const { user } = loginReducer  
  const dispatch = useDispatch()
  const handleDeletePostPopUpState = () => {
    setConfirmDeletePost(!confirmDeletePost)
  }

  const handleDeletePost = () => {
    dispatch(deletePost(postId, public_id))
    setConfirmDeletePost(!confirmDeletePost)
  }

  return (
    <div className={styles.postHeader}>
      <div className={styles.postHeaderImg}>
        <i className='fas fa-user-circle' />
      </div>
      <div className={styles.postHeaderUsername}>
        <h3>{username}</h3>
      </div>

      { user && user.name === username?(<div
        className={styles.deletePostBtn}
        onClick={handleDeletePostPopUpState}
      >
        <i className='fas fa-trash' />
      </div>) : ''
      }


      <div
        className={styles.deletePostPopUpContainer}
        style={{ display: confirmDeletePost ? 'flex' : 'none' }}
      >
        <div className={styles.deletePostPopUp}>
          <div className={styles.deletePostDisclaimer}>
            <strong>Are you sure?</strong>
          </div>
          <div className={styles.deletePostActionBtnContainer}>
            <div
              onClick={handleDeletePostPopUpState}
              className={styles.cancelDeleteBtn}
            >
              Cancel
            </div>
            <div onClick={handleDeletePost} className={styles.confirmDeleteBtn}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostHeaderSection
