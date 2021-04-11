import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from "../css/profile/profileScreen.module.css"
import { getProfile } from "../actions/profileActions"
import * as followerActions from "../actions/followerActions"
import ChangeProfilePicture from "../components/profile/ChangeProfilePicture"
import { socket } from "../Layout"
import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileContentSelector from "../components/profile/ProfileContentSelector"
import ProfileContentComponent from "../components/profile/ProfileContentComponent"

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const profileReducer = useSelector((state) => state.profileReducer)
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { profile, error } = profileReducer
  const { user } = userInfoReducer
  const [followersCount, setFollowersCount] = useState(0)
  const [following, setFollowing] = useState(false)
  const [
    editProfilePicturePopUpState,
    setEditProfilePicturePopUpState,
  ] = useState(false)

  const isFollowing = (followersList) => {
    return followersList && followersList.some(({ followerId }) => followerId === user._id)
  }

  const isSelected = (path) => {
    return window.location.pathname.includes(path) ? true : false
  }

  const isCurrentUser = () => {
    return profile?.user?.name === user?.name
  }

  const handleFollow = async () => {
    const { newFollowersCount } = await dispatch(followerActions.follow( profile.user._id, followersCount ))
    const notification = {
      from: user._id,
      to: profile.user._id,
      type: "follow",
    }
    socket.emit("sendNotification", {
      notification,
      username: profile.user.name,
    })
    setFollowersCount(await newFollowersCount)
    setFollowing(true)
  }

  const handleUnfollow = async () => {
    const { newFollowersCount } = await dispatch( followerActions.unFollow( profile.user._id, followersCount ))
    setFollowersCount(await newFollowersCount)
    setFollowing(false)
  }

  const getProfileInfo = async () => {
      const { followers } = await dispatch(getProfile(params.username))
      setFollowersCount(await followers?.length)
      setFollowing(isFollowing(await followers))
  }
  
  useEffect(() => {
    if (!profile) {
      getProfileInfo()
    }
  }, [params.username])

  useEffect(() => {
    getProfileInfo()
  }, [params.username])

  return (
    <div className={styles.profileScreenContainer}>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <ProfileHeader
            isCurrentUser={isCurrentUser}
            setEditProfilePicturePopUpState={setEditProfilePicturePopUpState}
            following={following}
            handleUnfollow={handleUnfollow}
            handleFollow={handleFollow}
          />

          <div className={styles.profileContent}>
            <ProfileContentSelector
              isSelected={isSelected}
              followersCount={followersCount}
              isCurrentUser={isCurrentUser}
            />
            <ProfileContentComponent isCurrentUser={isCurrentUser} />
          </div>
        </div>
      )}
      <ChangeProfilePicture
        setEditProfilePicturePopUpState={setEditProfilePicturePopUpState}
        editProfilePicturePopUpState={editProfilePicturePopUpState}
      />
    </div>
  )
}

export default ProfileScreen