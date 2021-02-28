import React from 'react'
import CreatePost from './CreatePost'
import Post from './Post'
import styles from '../css/feed.module.css'
import Loading from './Loading'


const Feed = ({ posts, loading }) => {    

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
