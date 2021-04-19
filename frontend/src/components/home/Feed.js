import React from 'react'
import CreatePost from './CreatePost'
import Post from '../post/Post'
import styles from '../../css/home/feed.module.css'
import Loading from '../layout/Loading'


const Feed = ({ posts }) => {    

  return (    
    <div className={styles.feedContainer}>
      <div className={styles.feedCreatePostContainer}>
        <CreatePost />
      </div>
    {posts?
      <div className={styles.feedPostsContainer}>       
        {posts && posts.map((post) => (
          <Post
            key={post._id}
            user={post.user}            
            image={post.image}            
            title={post.title}
            description={post.description}
            comments={post.comments}
            postId={post._id}
            likes={post.likes} 
            creator={post.creator}  
            post={post}         
          />
        ))}
      </div> : (
        <div className={styles.loadingContianer}>
          <Loading />
        </div>
      )}
    </div>
  )
}

export default Feed
