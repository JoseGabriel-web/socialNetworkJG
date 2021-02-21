import React, { useEffect } from 'react'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/profileScreen.module.css'
import defaultProfilePicture from '../images/user.png'
import { getProfile } from '../actions/profileActions'
import ProfileGallery from '../components/ProfileGallery'
import Loading from '../components/Loading'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const loginReducer = useSelector((state) => state.loginReducer)
  const { profile = null, loading = true, error } = profileReducer
  const ownusername = loginReducer.user.name
  const params = useParams()
  const getUserProfile = () => {
    dispatch(getProfile(params.username))
  }

  useEffect(() => {
    getUserProfile()
  }, [params.username])

  const capitalizeString = (string) => {
    if (string?.split(' ').length > 1) {
      return string
        .split(' ')
        .map((word) => capitalizeString(word))
        .join(' ')
    }
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }

  const replaceSpace = (string) => {
    return string?.split(' ').join('+')
  }

  const sections = [
    {
      endpoint: 'gallery',
      label: 'Gallery',
      component: ProfileGallery,
    },
    {
      endpoint: 'followers',
      label: 'Followers',
      component: ProfileFollowers,
    },
    {
      endpoint: 'postSaved',
      label: 'Posts Saved',
      component: ProfilePostsSaved,
    },
  ]

  return (
    <div className={styles.profileScreenContainer}>
      {loading ? (
        <Loading />
      ) : error? <h1>{error}</h1> : (
        <div>
          <div className={styles.profileHeader}>
            <div className={styles.profileHeaderContent}>
              <div className={styles.profilePicture} style={{backgroundImage: `url(${defaultProfilePicture})`}} />
              <h3>{profile && capitalizeString(profile.user.name)}</h3>
            </div>

            <div className={styles.profilePublicDetails}>
              <div className={styles.profilePublicDetailsGroup}>                
                <div>
                  <i className='fas fa-users' />
                </div>
                <div>{profile && profile.user.followers.length}</div>
                <div>
                  <h3>Followers</h3>
                </div>
              </div>
              <div className={styles.profilePublicDetailsGroup}>
                <div>
                  <i className='fas fa-images' />
                </div>
                <div>{profile && profile.posts.length}</div>
                <div>
                  <h3>Posts</h3>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profileContentSelector}>
              {sections.map(section => (
                <Link
                  to={`/profile/${replaceSpace(profile?.user?.name)}/${section.endpoint}`}
                  className={styles.profileContentSelectorTab}>
                  {section.label}
                </Link>  
              ))}              
              {profile.user.name === ownusername ? (
                <Link
                  to={`/profile/${replaceSpace(profile?.user?.name)}/settings`}
                  className={styles.profileContentSelectorTab}>
                  Settings
                </Link>
              ) : null}
            </div>

            <div className={styles.profileContentComponent}>
              <Switch>
                {sections.map((section) => (
                  <Route
                    path={`/profile/${replaceSpace(profile?.user?.name)}/${section.endpoint}`}                    
                    component={section.component}                    
                  />                                      
                ))}
                {profile.user.name === ownusername ? (
                  <Route
                    path={`/profile/${replaceSpace(profile?.user?.name)}/settings`}                    
                    component={ProfileSettings}                  
                />
                ) : null}
              </Switch>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileScreen




// MOVE TO OWN COMPONENT FILE
const ProfilePostsSaved = () => {
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile, loading = true } = profileReducer
  return <div className={styles.responsive}>{JSON.stringify(profile)}</div>
}
const ProfileFollowers = () => {
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile, loading = true } = profileReducer
  return <div>{JSON.stringify(profile)}</div>
}
const ProfileSettings = () => {
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile, loading = true } = profileReducer  
  return <div>{JSON.stringify(profile)}</div>
}