import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../layout/Loading"
import defaultProfilePicture from "../../images/user.png"
import styles from "../../css/profile/profileHeader.module.css"

const ProfileHeader = ({
  isCurrentUser,
  setEditProfilePicturePopUpState,
  editProfilePicturePopUpState,
  following,
  handleUnfollow,
  handleFollow,
}) => {
  const updateProfilePictureReducer = useSelector(
    (state) => state.updateProfilePictureReducer
  )
  const profileReducer = useSelector((state) => state.profileReducer)
  const { updatedProfilePicture, loading } = updateProfilePictureReducer
  const { profile, error } = profileReducer
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture)

  const handleProfilePictureUpdate = () => {
    setEditProfilePicturePopUpState(!editProfilePicturePopUpState)
  }

  const handleProfilePicture = () => {    
    if(isCurrentUser() && updatedProfilePicture?.url) {
      return setProfilePicture(updatedProfilePicture.url)
    }
    setProfilePicture(profile?.user?.profilePicture.url || defaultProfilePicture)
    return
  }

  useEffect(() => {
    handleProfilePicture()
  }, [updatedProfilePicture, profile])

  useEffect(() => handleProfilePicture(), [])
  
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profilePictureContainer}>
        <div className={styles.profilePicture}>                    
          {loading ? <Loading small={true} /> : (
            <img src={profilePicture} alt='' />
          )}
        </div>


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
      <h3 className={styles.username} style={{ textTransform: "capitalize" }}>
        {profile ? profile.user.name : error ? error.message : "username"}
      </h3>
    </div>
  )
}

export default ProfileHeader
