import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/profileGallery.module.css'
import Loading from './Loading'
import DeletePost from './DeletePost'

const ProfileGallery = () => {
  const profileReducer = useSelector((state) => state.profileReducer)  
  const loginReducer = useSelector((state) => state.loginReducer)  
  const { user } = loginReducer
  const { profile, loading = true } = profileReducer  
  const [isOpened, setIsOpened] = useState(false)
  const [postId, setPostId] = useState(null)
  const [public_id, setPublic_id] = useState(null)
  const handleDeletePostPopUpState = (id, imgId) => {
    setPostId(id)
    setPublic_id(imgId)
    setIsOpened(!isOpened)
  }

  const isCurrentUser = () => {
    return profile.user.name === user.name
  }

  const handleOpenPost = (post) => {

  }
  
  // ADD OPTIONS TO ( DELETE, already done ) POST FROM HERE GALLERY / MAYBE EDIT IT (MAYBE)
  return (
    <div className={styles.profileGalleryContainer}>
      {loading ? (
        <Loading />
      ) : profile.posts.length > 0 ? (
        <div className={styles.grid}>

          {loading ? (
            <Loading />
          ) : (
            profile.posts.map((post) => (     
              <div className={styles.galleryPost}> 
              {isCurrentUser()? <i className={`fas fa-times ${styles.deletePostIcon}`} onClick={() => handleDeletePostPopUpState(post._id, post.image.public_id)} /> : null }    
              <i className={`fas fa-expand ${styles.openPostIcon}`} onClick={handleOpenPost(post)} />
              <img height='auto' width='100%' src={`${post.image.url}`} alt='' />
              </div>
            ))            
          )}

        </div>
      ) : (

        <div>
          Here Goes the no posts found page
        </div>

      )}
      <DeletePost isOpened={isOpened} setIsOpened={setIsOpened} postId={postId} handleDeletePostPopUpState={handleDeletePostPopUpState} public_id={public_id} />
    </div>
  )
}

export default ProfileGallery
