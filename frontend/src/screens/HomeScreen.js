import React, { useEffect } from 'react'  
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/homeScreen.module.css'
import Feed from '../components/Feed'
import Loading from '../components/Loading'
import { getPosts } from '../actions/postActions'
import { GET_POSTS_REQUEST } from '../constants/postConstants'



const HomeScreen = () => {
  const dispatch = useDispatch()
  const getPostsReducer = useSelector((state) => state.getPostsReducer)
  const { loading = true, posts } = getPostsReducer

  const getFeedPosts = () => {    
    dispatch(getPosts())    
    return dispatch({ type: GET_POSTS_REQUEST })
  }
  
  useEffect(() => {    
    getFeedPosts()    
  },[])
  
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeFeedContainer}>
        {loading? <Loading /> : <Feed posts={posts} />}        
      </div>     
  </div>  
  )
}

export default HomeScreen

