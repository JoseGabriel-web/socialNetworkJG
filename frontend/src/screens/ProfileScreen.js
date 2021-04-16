import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProfile } from "../actions/profileActions"
import * as helpers from "../helpers/index"
import styles from "../css/profile/profileScreen.module.css"
import * as followerActions from "../actions/followerActions"
import ChangeProfilePicture from "../components/profile/ChangeProfilePicture"
import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileContentSelector from "../components/profile/ProfileContentSelector"
import ProfileContentComponent from "../components/profile/ProfileContentComponent"

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const profileReducer = useSelector((state) => state.profileReducer)
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const followersInfoReducer = useSelector((state) => state.followersInfoReducer)
  const { followersList, followingList } = followersInfoReducer
  const { profile } = profileReducer
  const { user } = userInfoReducer
  const [followersCount, setFollowersCount] = useState(0)
  const [following, setFollowing] = useState(false)
  const [ editProfilePicturePopUpState, setEditProfilePicturePopUpState ] = useState(false)

  const isSelected = (path) => {
    return window.location.pathname.includes(path)
  }

  const isCurrentUser = () => {
    return profile?.user?.name === user?.name
  }

  const handleFollow = async () => {
    dispatch(followerActions.follow( profile.user._id, user._id ))
    helpers.notification.emitNotification({
      from: user._id,
      to: profile.user._id,
      type: "follow",
      username: profile.user.name
    })
  }

  const handleUnfollow = async () => {    
    dispatch( followerActions.unFollow( profile.user._id, user._id ))    
  }

  const getProfileInfo = async () => {       
      dispatch(getProfile(params.username, history))      
  }

  useEffect(() => {
    if(followersList) {
      setFollowersCount(followersList.length)
    }
  },[followersList])
  
  useEffect(() => {
    if(followingList) {
      setFollowing(followersList.some(({ followerId }) => followerId === user._id))
    }
  },[followingList])

  useEffect(() => {
    if(profile && user) {
      dispatch(followerActions.getProfileFollowersInfo(profile.user._id, user._id))
    }
  }, [profile])
  
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
      <ChangeProfilePicture
        setEditProfilePicturePopUpState={setEditProfilePicturePopUpState}
        editProfilePicturePopUpState={editProfilePicturePopUpState}
      />
    </div>
  )
}

export default ProfileScreen