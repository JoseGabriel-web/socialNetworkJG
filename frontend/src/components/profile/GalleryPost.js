import React, { useState } from 'react'
import styles from '../../css/profile/galleryPost.module.css'
import useLazyImg from '../../hooks/useLazyImg'
import ViewPost from '../layout/ViewPost'

const GalleryPost = ({ post, isCurrentUser, handleDeletePostPopUpState }) => {
  const loadedImg = useLazyImg(post.image.url)
  const [isOpened, setIsOpened] = useState(false)

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
        className={`fas fa-expand-arrows-alt ${styles.openPostIcon}`}          
        onClick={() => setIsOpened(!isOpened)}
      />
      <ViewPost post={post} isOpened={isOpened} setIsOpened={setIsOpened} />
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
