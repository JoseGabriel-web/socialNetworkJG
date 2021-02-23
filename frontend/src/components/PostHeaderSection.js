import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../css/postHeaderSection.module.css'
import DeletePost from './DeletePost'

const PostHeaderSection = ({ userId, postId, public_id, username }) => {
  const [isOpened, setIsOpened] = useState(false)
  const loginReducer = useSelector(state => state.loginReducer)
  const { user } = loginReducer  
  
  const handleDeletePostPopUpState = () => {
    setIsOpened(!isOpened)
  }

  const replaceSpace = (string) => {
    return string.split(' ').join('+')
  }

  return (
    <div className={styles.postHeader}>
      <div className={styles.postHeaderImg}>
        <i className='fas fa-user-circle' />
      </div>
      <div className={styles.postHeaderUsername}>
        <Link to={`/profile/${replaceSpace(username)}/gallery`}>{username}</Link>
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
