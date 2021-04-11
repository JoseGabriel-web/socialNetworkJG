import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileFollowersList } from '../../actions/followerActions'
import styles from '../../css/profile/profileFollowers.module.css'
import Loading from '../layout/Loading'

const ProfileFollowers = () => {  
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const userFollowersListReducer = useSelector((state) => state.userFollowersListReducer)   
  const { profile } = profileReducer
  const { followersList, loading = true } = userFollowersListReducer

  useEffect(() => {
    if(profile) {
      dispatch(getProfileFollowersList(profile? profile.user._id : ''))
    }
  }, [profile])

  return (
    <div className={styles.profileFollowersContainer}>
      {loading? (
        <div className={styles.profileFollowersLoader}>
          <Loading />
        </div>
      ) : followersList? followersList.map(follower => (
        <div className={styles.follower}>
          <h3>{follower.followerName}</h3>
        </div>
      )) : 'Please check connection or enter valid URL'}
    </div>
  )
}

export default ProfileFollowers
