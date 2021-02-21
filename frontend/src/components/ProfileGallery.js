import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/profileGallery.module.css'
import Loading from './Loading'

const ProfileGallery = () => {
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile, loading = true } = profileReducer

  // ADD OPTIONS TO DELETE POST FROM HERE GALLERY / MAYBE EDIT IT (MAYBE)
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
              <img height='auto' width='100%' src={`${post.image.url}`} alt='' />
            ))            
          )}

        </div>
      ) : (

        <div>
          Here Goes the no posts found page
        </div>

      )}
    </div>
  )
}

export default ProfileGallery
