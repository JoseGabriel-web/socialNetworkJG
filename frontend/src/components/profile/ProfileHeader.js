import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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
  const updateProfilePictureReducer = useSelector(
    (state) => state.updateProfilePictureReducer
  )
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { updatedProfilePicture } = updateProfilePictureReducer
  const { profile } = profileReducer  

  const handleProfilePictureUpdate = () => {
    setEditProfilePicturePopUpState(!editProfilePicturePopUpState)
  }

  return (
    <div className={styles.profileHeader}>
      <div
        className={styles.profilePicture}
        style={{
          backgroundImage: `url(${
            updatedProfilePicture &&
            updatedProfilePicture.url &&
            isCurrentUser()
              ? updatedProfilePicture.url
              : profile && profile.user.profilePicture.url
              ? profile.user.profilePicture.url
              : defaultProfilePicture
          })`,
        }}
      >
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
        {profile ? profile.user.name : "username"}
      </h3>
    </div>
  )
}

export default ProfileHeader
