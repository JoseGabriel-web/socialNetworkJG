import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import Post from './Post'
import styles from '../css/feed.module.css'
import { getPosts } from '../actions/postActions'

const Feed = () => {
  const dispatch = useDispatch()
  const getPostsReducer = useSelector((state) => state.getPostsReducer)
  const { posts } = getPostsReducer

  const followers = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]

  const getFeedPosts = () => {
    dispatch(getPosts())
  }

  useEffect(() => {
    getFeedPosts()
  }, [])

  return (    
    <div className={styles.feedContainer}>
      <div className={styles.feedCreatePostContainer}>
        <CreatePost />
      </div>

      <div className={styles.feedPostsContainer}>        
        {posts && posts.reverse().map((post) => (
          <Post
            key={post._id}
            user={post.user}
            image={post.image}
            title={post.title}
            description={post.description}
            comments={post.comments}
            postId={post._id}
            likes={post.likes}            
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
