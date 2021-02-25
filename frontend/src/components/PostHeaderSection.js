import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../css/postHeaderSection.module.css'
import DeletePost from './DeletePost'
import defaultProfilePicture from '../images/user.png'

const PostHeaderSection = ({ postId, public_id, name, profilePicture }) => {
  const [isOpened, setIsOpened] = useState(false)
  const loginReducer = useSelector(state => state.loginReducer)
  const { user } = loginReducer  
  
  const handleDeletePostPopUpState = () => {
    setIsOpened(!isOpened)
  }

  const replaceSpace = (string) => {
    return string.split(' ').join('+')
  }

  const capitalizeString = (string) => {
    if (string?.split(' ').length > 1) {
      return string
        .split(' ')
        .map((word) => capitalizeString(word))
        .join(' ')
    }
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }

  return (
    <div className={styles.postHeader}>
      <div className={styles.postHeaderImg} style={{backgroundImage: profilePicture? `url(${profilePicture})` : `url(${defaultProfilePicture})`}} />
      <div className={styles.postHeaderUsername}>
        <Link to={`/profile/${replaceSpace(name)}/gallery`}>{capitalizeString(name)}</Link>
      </div>

      { user && user.name === name?(<div
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
