import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../../css/post/postHeaderSection.module.css"
import DeletePost from "../layout/DeletePost"
import defaultProfilePicture from "../../images/user.png"
import * as utils from "../../utils/index"
import useLazyImg from "../../hooks/useLazyImg"

const PostHeaderSection = ({ postId, public_id, name, profilePicture, creator }) => {
  const [isOpened, setIsOpened] = useState(false)
  const userInfoReducer = useSelector((state) => state.userInfoReducer)
  const { user } = userInfoReducer
  const loadedImg = useLazyImg(profilePicture)

  const handleDeletePostPopUpState = () => {
    setIsOpened(!isOpened)
  }

  return (
    <div className={styles.postHeader}>
      <div
        className={styles.postHeaderImg}
        style={{
          backgroundImage: `url(${loadedImg || defaultProfilePicture})`,
        }}
      />
      <div className={styles.postHeaderUsername}>
        <Link
          style={{ textTransform: "capitalize" }}
          to={`/profile/${utils.string.replaceSpace(name)}/gallery`}
        >
          {name}
        </Link>
      </div>

      {user && user._id === creator ? (
        <div
          className={styles.deletePostBtn}
          onClick={handleDeletePostPopUpState}
        >
          <i className='fas fa-trash-alt' />
        </div>
      ) : (
        ""
      )}

      <DeletePost
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        postId={postId}
        handleDeletePostPopUpState={handleDeletePostPopUpState}
        public_id={public_id}
      />
    </div>
  )
}

export default PostHeaderSection
