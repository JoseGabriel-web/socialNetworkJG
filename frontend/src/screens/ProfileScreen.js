import React, { useEffect } from 'react'
import { Link, Route, Switch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/profileScreen.module.css'
import { getProfile } from '../actions/profileActions'
import Loading from '../components/Loading'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile = null, loading = true } = profileReducer
  const params = useParams()

  const getUserProfile = () => {
    dispatch(getProfile(params.username))
  }

  useEffect(() => {
    getUserProfile()    
  }, [params.username])

  const capitalizeString = (string) => {
    let result = []
    if (string.split(' ').length > 1) {
      string.split(' ').map((word) => {
        return result.push(capitalizeString(word))
      })
      return result.join(' ')
    }
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
  }

  const replaceSpace = (string) => {
    return string.split(' ').join('+')
  }

  return (
    <div className={styles.profileScreenContainer}>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.profileHeader}>
            <div className={styles.profileHeaderContent}>
              <i className='fas fa-user' />
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
              <Link
                to={`/profile/${
                  profile ? replaceSpace(profile.user.name) : ''
                }/gallery`}
                className={styles.profileContentSelectorTab}
              >
                Gallery
              </Link>
              <Link
                to={`/profile/${
                  profile ? replaceSpace(profile.user.name) : ''
                }/followers`}
                className={styles.profileContentSelectorTab}
              >
                Followers
              </Link>
              <Link
                to={`/profile/${
                  profile ? replaceSpace(profile.user.name) : ''
                }/postsSaved`}
                className={styles.profileContentSelectorTab}
              >
                Posts Saved
              </Link>
            </div>

            <div height='100%'>
              <Switch>
                <Route
                  path={`/profile/${
                    profile ? replaceSpace(profile.user.name) : ''
                  }/gallery`}
                >                                     
                    <ProfileGallery posts={profile ? profile.posts : []} />                  
                </Route>
                <Route
                  path={`/profile/${
                    profile ? replaceSpace(profile.user.name) : ''
                  }/followers`}
                >
                  <ProfileFollowers
                    followers={profile ? profile.user.followers : []}
                  />
                </Route>
                <Route
                  path={`/profile/${
                    profile ? replaceSpace(profile.user.name) : ''
                  }/postsSaved`}
                >
                  <ProfilePostsSaved
                    postsSaved={profile ? profile.user.savedPosts : []}
                  />
                </Route>
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

const ProfileGallery = ({ posts }) => {
  return (
    <div height='100%'>
      {/* { posts? JSON.stringify(posts) : '' } */}
      {posts
        ? posts.map((post) => (
            <img height='300px' width='200px' src={post.image.url} />
          ))
        : ''}
    </div>
  )
}
const ProfilePostsSaved = ({ postsSaved }) => {
  return <div>{JSON.stringify(postsSaved)}</div>
}
const ProfileFollowers = ({ followers }) => {
  return <div>{JSON.stringify(followers)}</div>
}
