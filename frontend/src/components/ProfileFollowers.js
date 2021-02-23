import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileFollowersList } from '../actions/followerAction'
import styles from '../css/profileFollowers.module.css'
import Loading from './Loading'

const ProfileFollowers = () => {  
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const userFollowersListReducer = useSelector((state) => state.userFollowersListReducer)  
  const followUserReducer = useSelector((state) => state.followUserReducer)  
  const unFollowUserReducer = useSelector((state) => state.unFollowUserReducer) 
  const follow = followUserReducer.message
  const unFollow = unFollowUserReducer.message
  const { profile } = profileReducer
  const { followersList, loading = true } = userFollowersListReducer

  useEffect(() => {
    dispatch(getProfileFollowersList(profile.user.name))
  }, [follow, unFollow])

  return (
    <div className={styles.profileFollowersContainer}>
      {loading? <Loading /> : followersList.map(follower => (
        <div className={styles.follower}>
          <h3>{follower}</h3>
        </div>
      ))}
    </div>
  )
}

export default ProfileFollowers
