import React from 'react'
import styles from '../../css/profile/galleryPost.module.css'
import useLazyImg from '../../hooks/useLazyImg'

const GalleryPost = ({ post, isCurrentUser, handleDeletePostPopUpState }) => {
  const loadedImg = useLazyImg(post.image.url)

  return (
    <div className={styles.galleryPost}>
      {isCurrentUser() ? (
        <i
          className={`fas fa-times ${styles.deletePostIcon}`}
          onClick={() =>
            handleDeletePostPopUpState(post._id, post.image.public_id)
          }
        />
      ) : null}
      <i
        className={`fas fa-external-link-square-alt ${styles.openPostIcon}`}                  
      />
      <img
        height='auto'
        width='100%'
        src={`${loadedImg || null}`}
        alt=''
      />                
    </div>
  )
}

export default GalleryPost
