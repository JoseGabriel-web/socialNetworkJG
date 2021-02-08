import React from 'react'
import styles from '../css/post.module.css'

const Post = ({image, isVideo, video}) => {


  return (
    <div className={styles.postContainer}>
      
      <div className={styles.postHeader}>
        <div className={styles.postHeaderImg}>
          <i className='fas fa-user-circle' />
        </div>        
        <div className={styles.postHeaderUsername}>
          <h3>User name Goes here</h3>
        </div>        
      </div>

      <div className={styles.postBody}>
        <div className={styles.postBodyImg} style={{background: `url(${image})`}}>
          {isVideo? (
            <video height='auto' width='100%' controls>
              <source src={`${video}`} type="video/mp4" />  
            </video>
          ) : <img src={image} width='auto' height='auto' />}
        </div>
      </div>      

    </div>
  )
}

export default Post
