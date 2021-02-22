import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/postHeaderSection.module.css'
import { deletePost } from '../actions/postActions'
import Popup from './Popup'
import DeletePost from './DeletePost'

const PostHeaderSection = ({ userId, postId, public_id, username }) => {
  const [isOpened, setIsOpened] = useState(false)
  const loginReducer = useSelector(state => state.loginReducer)
  const { user } = loginReducer  
  const dispatch = useDispatch()
  
  const handleDeletePostPopUpState = () => {
    setIsOpened(!isOpened)
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
        <i className='fas fa-trash-alt' />
      </div>) : ''
      }


      <DeletePost isOpened={isOpened} setIsOpened={setIsOpened} postId={postId} handleDeletePostPopUpState={handleDeletePostPopUpState} public_id={public_id} />
    </div>
  )
}

export default PostHeaderSection
