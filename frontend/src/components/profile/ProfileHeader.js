import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from '../layout/Loading'
import defaultProfilePicture from "../../images/user.png"
import styles from "../../css/profile/profileHeader.module.css"

const ProfileHeader = ({
  isCurrentUser,
  setEditProfilePicturePopUpState,
  editProfilePicturePopUpState,
  following,
  handleUnfollow,
  handleFollow
}) => {  
  const updateProfilePictureReducer = useSelector((state) => state.updateProfilePictureReducer)
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { updatedProfilePicture, loading } = updateProfilePictureReducer
  const { profile, error } = profileReducer  

  const handleProfilePictureUpdate = () => {
    setEditProfilePicturePopUpState(!editProfilePicturePopUpState)
  }

  return (
    <div className={styles.profileHeader}>            
      <div
        className={styles.profilePicture}
        style={loading? { border: 'solid 2px black' } : (
          {
            backgroundImage: `url(${
              updatedProfilePicture &&
              updatedProfilePicture.url &&
              isCurrentUser()
                ? updatedProfilePicture.url
                : profile && profile.user.profilePicture.url
                ? profile.user.profilePicture.url
                : defaultProfilePicture
            })`,
          }
        )}
    >
      {loading? <Loading small={true} /> : null }

        <div
          className={styles.profileAction}
          onClick={
            isCurrentUser()
              ? handleProfilePictureUpdate
              : following
              ? handleUnfollow
              : handleFollow
          }
        >
          <i
            className={
              isCurrentUser()
                ? "fas fa-image"
                : following
                ? "fas fa-times"
                : "fas fa-user-plus"
            }
          />
        </div>
      </div>
      <h3 style={{ textTransform: "capitalize" }}>
        {profile ? profile.user.name : error? error.message : "username"}
      </h3>
    </div>
  )
}

// const ProfileHeader = () => {
//   return (
//     <div className={styles.perfectSquareContainer}>
//       <div className={styles.perfectSquare}>

//       </div>
//     </div>
//   )
// }

export default ProfileHeader
