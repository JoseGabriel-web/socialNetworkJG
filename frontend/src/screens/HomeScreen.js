import React, { useEffect } from 'react'  
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/home/homeScreen.module.css'
import Feed from '../components/home/Feed'
import { getPosts } from '../actions/postActions'
import { GET_POSTS_FAIL } from '../constants/postConstants'
import backgroundImg from '../images/img1.jpg'


const HomeScreen = () => {
  const dispatch = useDispatch()
  const getPostsReducer = useSelector((state) => state.getPostsReducer)
  const { loading = true, posts } = getPostsReducer

  const getFeedPosts = () => {    
    dispatch(getPosts())    
    return dispatch({ type: GET_POSTS_FAIL })
  }
  
  useEffect(() => {    
    getFeedPosts()    
  },[])
  
  return (
    <div className={styles.homeContainer} style={{backgroundImage: `url(${backgroundImg})`}}>
      <div className={styles.homeFeedContainer}>        
        <Feed posts={posts? posts : null} loading={loading} />    
      </div>     
  </div>  
  )
}

export default HomeScreen

