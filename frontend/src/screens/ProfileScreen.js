import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import defaultProfilePicture from '../images/user.png'
import styles from '../css/profile/profileScreen.module.css'
import { getProfile } from '../actions/profileActions'
import { sections } from '../data/profileData'
import * as followerActions from '../actions/followerActions'
import ChangeProfilePicture from '../components/profile/ChangeProfilePicture'
import ProfileSettings from '../components/profile/ProfileSettings'
import * as utils from '.././utils/index'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const updateProfilePictureReducer = useSelector((state) => state.updateProfilePictureReducer)
  const profileReducer = useSelector((state) => state.profileReducer)
  const loginReducer = useSelector((state) => state.loginReducer)
  const { updatedProfilePicture } = updateProfilePictureReducer
  const { profile, error } = profileReducer
  const { user } = loginReducer
  const [followersCount, setFollowersCount] = useState(0)
  const [following, setFollowing] = useState()
  const [editProfilePicturePopUpState,setEditProfilePicturePopUpState] = useState(false)

  const isFollowing = (followersList) => {
    return followersList && followersList.includes(user.name)
  }

  const isSelected = (path) => {
    return window.location.pathname.includes(path) ? true : false
  }

  const isCurrentUser = () => {
    return profile?.user?.name === user?.name
  }

  const handleProfilePictureUpdate = () => {
    setEditProfilePicturePopUpState(!editProfilePicturePopUpState)
  }

  const handleFollow = async () => {
    const { newFollowersCount } = await dispatch(
      followerActions.follow(user.name, profile.user.name, followersCount)
    )
    setFollowersCount(await newFollowersCount)
    setFollowing(true)
  }

  const handleUnfollow = async () => {
    const { newFollowersCount } = await dispatch(
      followerActions.unFollow(user.name, profile.user.name, followersCount)
    )
    setFollowersCount(await newFollowersCount)
    setFollowing(false)
  }

  useEffect(() => {
    (async () => {
      const { followers } = await dispatch(getProfile(params.username))
      setFollowersCount(followers?.length)
      setFollowing(isFollowing(followers))
    })()
  }, [params.username])

  return (
    <div className={styles.profileScreenContainer}>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div>
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
                      ? 'fas fa-image'
                      : following
                      ? 'fas fa-times'
                      : 'fas fa-user-plus'
                  }
                />
              </div>
            </div>
            <h3 style={{ textTransform: 'capitalize' }}>
              {profile ? profile.user.name : 'username'}
            </h3>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profileContentSelector}>
              {sections.map((section) => (
                <Link
                  key={section.label}
                  to={`/profile/${
                    profile && utils.string.replaceSpace(profile.user.name)
                  }/${section.endpoint}`}
                  className={styles.profileContentSelectorTab}
                >
                  <div
                    className={
                      isSelected(section.endpoint) ? styles.active : null
                    }
                  >
                    {section.label === 'Followers' ? followersCount : null}
                    {section.label === 'Gallery'
                      ? profile?.posts?.length
                      : null}
                    <h4 style={{ padding: '0 10px' }}>{section.label}</h4>
                    <i className={section.icon} />
                  </div>
                </Link>
              ))}
              {isCurrentUser() ? (
                <Link
                  key={'settings'}
                  to={`/profile/${
                    profile && utils.string.replaceSpace(profile.user.name)
                  }/settings`}
                  className={styles.profileContentSelectorTab}
                >
                  <div
                    className={isSelected('settings') ? styles.active : null}
                  >
                    <h4>Settings</h4>
                    <i
                      style={{ paddingLeft: '10px' }}
                      className='fas fa-cogs'
                    />
                  </div>
                </Link>
              ) : null}
            </div>

            <div className={styles.profileContentComponent}>
              <Switch>
                {sections.map((section) => (
                  <Route
                    key={section.endpoint}
                    path={`/profile/${
                      profile && utils.string.replaceSpace(profile.user.name)
                    }/${section.endpoint}`}
                    component={section.component}
                  />
                ))}
                {isCurrentUser() ? (
                  <Route
                    key={'settings'}
                    path={`/profile/${utils.string.replaceSpace(
                      profile?.user?.name
                    )}/settings`}
                    component={ProfileSettings}
                  />
                ) : null}
              </Switch>
            </div>
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
