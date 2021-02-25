import React, {useState} from 'react'
import styles from '../css/post.module.css'
import PostCommentSection from './PostCommentSection'
import PostActionsSection from './PostActionsSection'
import PostMediaSection from './PostMediaSection'
import PostHeaderSection from './PostHeaderSection'
import PostDescriptionSection from './PostDescriptionSection'

const Post = ({ user, title, description, image, likes, postId, comments, isVideo }) => { 
  const [isCommentSectionOpened, setIsCommentSectionOpened] = useState(true) 
  return (
    <div className={styles.postContainer}>   
      <div className={styles.postHeaderSectionContainer}>
        <PostHeaderSection profilePicture={user.profilePicture} userId={user._id} name={user.name} public_id={image.public_id} postId={postId} />
      </div>
      <div className={styles.postBody}>
        <div className={styles.postMediaSectionContainer}>
          <PostMediaSection isVideo={isVideo} image={image.url} />
        </div>        
        <div className={styles.postActionSectionContainer}>
      <div className={styles.postDescriptionSectionContainer}>
        <PostDescriptionSection title={title} description={description} />   
      </div>
          <PostActionsSection postId={postId} likes={likes} isCommentSectionOpened={isCommentSectionOpened} setIsCommentSectionOpened={setIsCommentSectionOpened} />   
        </div>
        <div className={styles.postCommentSectionContainer}>
          <PostCommentSection comments={comments} postId={postId} isCommentSectionOpened={isCommentSectionOpened} setIsCommentSectionOpened={setIsCommentSectionOpened} />   
        </div>
      </div>   
    </div>
  )
}

export default Post
