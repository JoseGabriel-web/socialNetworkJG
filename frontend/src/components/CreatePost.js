import React, {useState, useEffect} from 'react'
import styles from '../css/createPost.module.css'

const CreatePost = () => {

  const [isOpened, setIsOpened] = useState(false)

  const handleFormState = () => {
    setIsOpened(!isOpened)
  }



  return (
    <div className={styles.createPostContainer}>
      
      <div className={styles.openFormIcon} onClick={handleFormState}>
        <i className='fas fa-plus' />        
      </div>

      <div className={styles.popUpContainer} style={{display: isOpened? 'flex' : 'none'}}>
        <div className={styles.formContainer}>
          
          <div className={styles.closeFormIcon} >
            <i className='fas fa-times-circle' onClick={handleFormState} />
          </div>

          <form>

          </form>

        </div>
      </div>

    </div>
  )
}

export default CreatePost
