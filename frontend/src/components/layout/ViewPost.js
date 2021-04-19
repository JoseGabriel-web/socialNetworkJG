import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../css/layout/viewPost.module.css'
import Popup from './Popup'
import DeletePost from "../layout/DeletePost"
import useLazyImg from '../../hooks/useLazyImg'
import { Link } from "react-router-dom"
import { string } from '../../utils/index'


// [ ] view post full screen
// [ ] if post.creator === user._id is able to edit it 
// [ ] users are able to comment from here
// [ ] like the post

const ViewPost = ({ post, isOpened, setIsOpened }) => {

  const userInfoReducer = useSelector(state => state.userInfoReducer)
  const { user } = userInfoReducer
  const loadedImage = useLazyImg(post.image.url)
  const loadedProfilePicture = useLazyImg(post.user.profilePicture)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [deletePostState, setDeletePostState] = useState(false)

  const handleDeletePostPopUpState = () => {
    setDeletePostState(!deletePostState)
  }
  
  useEffect(() => {
    if(post?.creator === user?._id) {
      setIsCurrentUser(true)
    }
  },[user])
  
  return (
    <Popup isOpened={isOpened}>
      <div className={styles.viewPostContainer}>
        
        <div className={styles.infoContainer}>
          
          <div className={styles.userInfo}>            
            <div className={styles.userProfileImgContainer}>              
              <div className={styles.userProfileImg}>
                <img src={loadedProfilePicture} alt="" />
              </div>
            </div>

            <div className={styles.userName}>
              <Link 
                to={`/profile/${string.replaceSpace(post.user.name)}/gallery`}>
                  {post.user.name}
              </Link>
            </div>

            {isCurrentUser && (
              <div className={styles.deletePostIconContainer}>
                <i className='fas fa-trash-alt' onClick={() => handleDeletePostPopUpState()} />
                <DeletePost
                  isOpened={deletePostState}
                  setIsOpened={setIsOpened}
                  postId={post._id}
                  handleDeletePostPopUpState={handleDeletePostPopUpState}
                  public_id={post.image.public_id}
                />
              </div> 
            )}
          </div> 

          <div className={styles.postAndCommentsInfoContainer}>
            <div className={styles.postInfo}>
            
            </div> 

            <div className={styles.commentsInfo}>
              {/* needs input for adding new comments */}
            </div> 
          </div>

        </div>

        <div className={styles.mediaContainer} style={{backgroundImage: `url(${loadedImage})`}}>
            <img src={loadedImage} alt="" />
            <i className='far fa-times-circle' onClick={() => setIsOpened(!isOpened)} />
        </div>        
        
      </div>
    </Popup>
  )
}

// _id (I also have the postId)
// creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   user: {
//     name: { type: String, default: null },
//     profilePicture: { type: String, default: null },
//   },
//   title: { type: String },
//   description: { type: String },
//   image: {
//     url: { type: String, required: true },
//     public_id: { type: String, required: true },
//   },  
//   likes: [],  
//   comments: [],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },

export default ViewPost
