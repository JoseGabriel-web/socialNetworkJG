import React, { useEffect } from 'react'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/profileScreen.module.css'
import defaultProfilePicture from '../images/user.png'
import { getProfile } from '../actions/profileActions'
import { sections } from '../data/profileData'
import Loading from '../components/Loading'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const loginReducer = useSelector((state) => state.loginReducer)
  const { profile = null, loading = true, error } = profileReducer
  const { user } = loginReducer
  const params = useParams()
  const getUserProfile = () => {
    dispatch(getProfile(params.username))
  }

  useEffect(() => {
    getUserProfile()
  }, [params.username])

  const isCurrentUser = () => {
    return profile.user.name === user.name
  }

  const handleProfilePictureUpdate = () => {
    console.log('Profile picture updated')
  }

  const handleFollow = () => {
    console.log(`${user.name} started following ${profile.user.name}`)
  }

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
  

  return (
    <div className={styles.profileScreenContainer}>
      {loading ? (
        <Loading />
      ) : error? <h1>{error}</h1> : (
        <div>
          <div className={styles.profileHeader}>
            <div className={styles.profileHeaderContent}>

              <div className={styles.profilePicture} style={{backgroundImage: `url(${defaultProfilePicture})`}}>
                <div 
                  className={styles.profileAction}
                  onClick={isCurrentUser()? handleProfilePictureUpdate : handleFollow}
                >
                  <i className={isCurrentUser()? 'fas fa-image' : 'fas fa-plus'} />
                </div>
              </div>
              <h3>{profile && capitalizeString(profile.user.name)}</h3>
            </div>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profileContentSelector}>
              {sections.map(section => (
                <Link
                  to={`/profile/${replaceSpace(profile?.user?.name)}/${section.endpoint}`}
                  className={styles.profileContentSelectorTab}>
                  {section.label === 'Followers'? profile.user.followers.length : null}
                  {section.label === 'Gallery'? profile.posts.length : null}
                  <h4 style={{padding: '0 10px'}}>{section.label}</h4>
                  <i className={section.icon} />
                </Link>  
              ))}              
              {isCurrentUser()? (
                <Link
                  to={`/profile/${replaceSpace(profile?.user?.name)}/settings`}
                  className={styles.profileContentSelectorTab}>
                  <h4>Settings</h4>
                  <i style={{paddingLeft: '10px'}} className='fas fa-cogs' />
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
                {isCurrentUser()? (
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
const ProfileSettings = () => {
  const profileReducer = useSelector((state) => state.profileReducer)  
  const { profile, loading = true } = profileReducer  
  return <div>{JSON.stringify(profile)}</div>
}