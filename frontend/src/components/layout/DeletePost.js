import React from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../css/layout/deletePost.module.css'
import { deletePost } from '../../actions/postActions'
import Popup from './Popup'

const DeletePost = ({isOpened, setIsOpened, postId, public_id, handleDeletePostPopUpState}) => {

  const dispatch = useDispatch()

  const handleDeletePost = () => {
    dispatch(deletePost(postId, public_id))
    setIsOpened(!isOpened)
  }


  return (
    <Popup isOpened={isOpened}>
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
    </Popup>
  )
}

export default DeletePost
