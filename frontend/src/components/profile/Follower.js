import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as followerActions from "../../actions/followerActions"
import * as utils from "../../utils/index"
import styles from "../../css/profile/follower.module.css"

const Follower = ({ follower, followingList, user }) => {
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile } = profileReducer
  const [followerStatus, setFollowerStatus] = useState()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    dispatch(
      followerActions.follow(follower.followerId, null, profile.user._id, user._id)
    )
  }
  const handleUnFollow = () => {
    dispatch(
      followerActions.unFollow(follower.followerId, null, profile.user._id, user._id)
    )
  }

  const handleClick = () => {
    if (isFollowing) return handleUnFollow()
    return handleFollow()
  }

  const checkFollowerStatus = () => {
    return followingList.some(({ userId }) => userId === follower.followerId)
  }

  useEffect(() => {
    if (isFollowing && followingList) {
      return setFollowerStatus("Following")
    }
    setFollowerStatus("Follow")
  }, [isFollowing, followingList])

  useEffect(() => {
    if (profile.user && followingList) {
      setIsFollowing(checkFollowerStatus())
    }
  }, [followingList])

  // check if followerId is in followingList userId

  return (
    <div className={styles.follower}>
      <Link
        to={`/profile/${utils.string.replaceSpace(
          follower.followerName
        )}/gallery`}
        className={styles.followerName}
      >
        {follower.followerName}
      </Link>
      {user._id !== follower.followerId && (
        <div
          className={`${styles.followerStatus} ${
            isFollowing ? styles.isFollowing : styles.isNotFollowing
          }`}
          onClick={handleClick}
        >
          {followerStatus && followerStatus}
        </div>
      )}
    </div>
  )
}

export default Follower
