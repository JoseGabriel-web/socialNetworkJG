import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../actions/postActions'
import Popup from './Popup'
import styles from '../css/postActionsSection.module.css'

const PostActionsSection = ({ postId, likes }) => {  
  const dispatch = useDispatch()
  const loginReducer = useSelector(state => state.loginReducer)
  const { user = {name: null} } = loginReducer
  const { name } = user
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes.length)  
  const [isOpened, setIsOpened] = useState(false)
  const [noUserAlert, setNoUserAlert] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false)


  const handleNoUser = () => {
    setIsOpened(false)
  }

  const handleSave = () => {
    if(name === null) {
      setNoUserAlert('save')
      return setIsOpened(true)
    }
  }

  const handleLike = async () => {   
    if(name === null) {
      setNoUserAlert('like')
      return setIsOpened(true)
    } else if(liked) {            
      const {isLiked, newLikesCount} = await dispatch(likePost('unlike', postId, name, likesCount))              
      setLikesCount(await newLikesCount)  
      setLiked(await isLiked)
    } else {      
      const {isLiked, newLikesCount} = await dispatch(likePost('like', postId, name, likesCount))              
      setLikesCount(await newLikesCount)
      setLiked(await isLiked)
    }    
  }


  useEffect(() => {
    if(likes.find(like => like === user.name)) {
      setLiked(true)
    } 
    else {
      setLiked(false)
    }
  },[])  

  return (
    <div className={styles.postActionsSectionContainer}>
      <div className={styles.postInfoContainer}>
        <h3>{likesCount} <i className='far fa-thumbs-up' /></h3>
      </div>
      <div className={styles.openPostCommentsContainer} >
        <h4>Comments</h4>
      </div>    
      <div className={styles.likePostContainer} onClick={handleLike}>
        <i className={`${liked? 'fas' : 'far' } fa-heart`} style={{cursor: 'pointer'}} />
      </div>      
      <div className={styles.sharePostContainer} onClick={handleSave}>
        <i className={isBookmarked? 'fas fa-bookmark' : 'far fa-bookmark'} />
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