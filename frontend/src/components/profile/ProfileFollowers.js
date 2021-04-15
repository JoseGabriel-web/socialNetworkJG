import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfileFollowersInfo } from "../../actions/followerActions"
import styles from "../../css/profile/profileFollowers.module.css"
import Loading from "../layout/Loading"
import Follower from "./Follower"

const ProfileFollowers = () => {
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const followersInfoReducer = useSelector(
    (state) => state.followersInfoReducer
  )
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const { profile } = profileReducer
  const { followersList, followingList, loading = true } = followersInfoReducer

  const sortingFunc = (a, b) => {
    return a.followerName.toUpperCase() < b.followerName.toUpperCase() ? -1 : 1
  }

  useEffect(() => {
    if (profile && profile.user._id && user && user._id) {
      dispatch(getProfileFollowersInfo(profile.user._id, user._id))
    }
  }, [profile])

  return (
    <div
      className={
        followersList && followersList.length > 0
          ? styles.profileFollowersContainer
          : styles.profileNullFollowers
      }
    >
      {loading ? (
        <div className={styles.profileFollowersLoader}>
          <Loading />
        </div>
      ) : followersList ? (
        <div>
          {followersList.length > 0 ? (
            followersList
              .sort(sortingFunc)
              .map((follower) => (
                <Follower
                  key={follower.followerId}
                  follower={follower}
                  followingList={followingList}
                  user={user}
                />
              ))
          ) : (
            <div>
              <i className='fas fa-users' />
              <i className='fas fa-users' />
            </div>
          )}
        </div>
      ) : (
        "Please check connection or enter valid URL"
      )}
    </div>
  )
}

export default ProfileFollowers
