import React, { useState } from "react"
import { useSelector } from "react-redux"
import styles from "../../css/profile/profileGallery.module.css"
import Loading from "../layout/Loading"
import DeletePost from "../layout/DeletePost"

const ProfileGallery = () => {
  const profileReducer = useSelector((state) => state.profileReducer)
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const { profile, loading = true, error } = profileReducer
  const [isOpened, setIsOpened] = useState(false)
  const [postId, setPostId] = useState(null)
  const [public_id, setPublic_id] = useState(null)
  const handleDeletePostPopUpState = (id, imgId) => {
    setPostId(id)
    setPublic_id(imgId)
    setIsOpened(!isOpened)
  }

  const isCurrentUser = () => {
    if (user) {
      return profile.user.name === user.name
    }
  }

  const handleOpenPost = (post) => {}

  // ADD OPTIONS TO ( DELETE, already done ) POST FROM HERE GALLERY / MAYBE EDIT IT (MAYBE)
  return (
    <div className={styles.profileGalleryContainer}>
      {loading ? (
        <Loading />
      ) : error ? (
        "Please check connection or enter valid URL"
      ) : profile.posts.length > 0 ? (
        <div className={styles.grid}>
          {loading ? (
            <Loading />
          ) : (
            profile.posts.map((post) => (
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
                  onClick={handleOpenPost(post)}
                />
                <img
                  height='auto'
                  width='100%'
                  src={`${post.image.url}`}
                  alt=''
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className={styles.galleryNull}>
          <i className='fas fa-camera' />
          <i className='fas fa-camera-retro' />
        </div>
      )}
      <DeletePost
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        postId={postId}
        handleDeletePostPopUpState={handleDeletePostPopUpState}
        public_id={public_id}
      />
    </div>
  )
}

export default ProfileGallery
