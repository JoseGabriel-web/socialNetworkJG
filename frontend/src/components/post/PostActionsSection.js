import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { likePost } from "../../actions/postActions"
import Popup from "../layout/Popup"
import styles from "../../css/post/postActionsSection.module.css"

const PostActionsSection = ({
  postId,
  likes,
  isCommentSectionOpened,
  setIsCommentSectionOpened,
}) => {
  const dispatch = useDispatch()  
  const { user } = useSelector((state) => state.userInfoReducer)
  const [likesList, setLikesList] = useState(likes)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes.length)
  const [isOpened, setIsOpened] = useState(false)
  const [noUserAlert, setNoUserAlert] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleCommentSection = () => {
    setIsCommentSectionOpened(!isCommentSectionOpened)
  }

  const handleNoUser = () => {
    setIsOpened(false)
  }

  const handleSave = () => {
    if (user && user.name === null) {
      setNoUserAlert("save")
      return setIsOpened(true)
    } 
  }

  const handleLike = async () => {
    if (user && user.name === null) {
      setNoUserAlert("like")
      return setIsOpened(true)
    } else if (liked) {
      const { newLikesCount } = await dispatch(likePost("unlike", postId, likesCount))
      setLikesList(likesList.filter((like) => like !== user.name))
      setLikesCount(await newLikesCount)      
    } else {
      const { newLikesCount } = await dispatch(likePost("like", postId, likesCount))
      setLikesList([...likesList, user.name])
      setLikesCount(await newLikesCount)
    }
  }

  useEffect(() => {
    if (user && likesList.includes(user.name)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [likesList, user])

  return (
    <div className={styles.postActionsSectionContainer}>
      <div className={styles.postInfoContainer}>
        <h3 className={styles.likesTooltipContiner}>
          {likesCount} <i className='far fa-thumbs-up' />
          <div className={styles.likesTooltip}>
            {likes &&
              likesList.map((like) => <h6 className={styles.capitalize}>{like}</h6>)}
          </div>
        </h3>
      </div>
      <div
        className={styles.openPostCommentsContainer}
        onClick={handleCommentSection}
      >
        <i
          className={
            isCommentSectionOpened ? "fas fa-sort-down" : "fas fa-sort-up"
          }
        />
        <h4>Comments</h4>
      </div>
      <div className={styles.likePostContainer} onClick={handleLike}>
        <i
          className={`${liked ? "fas" : "far"} fa-heart`}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.sharePostContainer} onClick={handleSave}>
        <i className={isBookmarked ? "fas fa-bookmark" : "far fa-bookmark"} />
      </div>
      <Popup isOpened={isOpened}>
        <div onClick={handleNoUser}>
          Please log in or sign up, to {noUserAlert} a post.
        </div>
      </Popup>
    </div>
  )
}

export default PostActionsSection