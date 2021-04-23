import React from 'react'
import styles from '../../css/post/comment.module.css'
import defaultProfilePic from '../../images/user.png'
import { Link } from 'react-router-dom'
import * as utils from '../../utils/index'
import useLazyImg from "../../hooks/useLazyImg"

const Comment = ({ comment, user, handleDeleteComment }) => {
  const loadedImg = useLazyImg(comment?.user?.profilePicture)
  
  if(!comment) return
  return (    
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div
          className={styles.commentHeaderProfileImg}
          style={{backgroundImage: `url(${loadedImg || defaultProfilePic})`}}
        />
        <Link
          to={`/profile/${utils.string.replaceSpace(comment?.user?.name)}/gallery`}
        >
          <h5 style={{textTransform: 'capitalize'}}>{comment?.user?.name}:</h5>
        </Link>                  
        {user && user._id === comment.creator ? (
          <i
            className='fas fa-trash-alt'
            onClick={() => handleDeleteComment(comment._id)}
          />
        ) : null}
      </div>
      <p>{comment.label}</p>
    </div>    
  )
}

export default Comment
