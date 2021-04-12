import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileFollowersInfo } from '../../actions/followerActions'
import styles from '../../css/profile/profileFollowers.module.css'
import Loading from '../layout/Loading'
import Follower from './Follower'

const ProfileFollowers = () => {  
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const userFollowersListReducer = useSelector((state) => state.userFollowersListReducer)  
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer 
  const { profile } = profileReducer
  const { followersList, followingList, loading = true } = userFollowersListReducer  

  useEffect(() => {
    if( profile && profile.user._id && user && user._id ) {
      dispatch(getProfileFollowersInfo(profile.user._id, user._id))
    }
  }, [profile])

  return (
    <div className={styles.profileFollowersContainer}>
      {loading? (
        <div className={styles.profileFollowersLoader}>
          <Loading />
        </div>
      ) : followersList? followersList.map(follower => (
        <Follower key={follower.followerId} follower={follower} followingList={followingList} user={user} />
      )) : 'Please check connection or enter valid URL'}
    </div>
  )
}

export default ProfileFollowers
