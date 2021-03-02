import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import DragOrDrop from './DragOrDrop'
import styles from '../css/createPost.module.css'
import { createPost } from '../actions/postActions'
import Popup from './Popup'

const CreatePost = () => {
  const dispatch = useDispatch()
  const [isOpened, setIsOpened] = useState(false)    
  const [image, setImage] = useState(null)
  const [isVideo, setIsVideo] = useState(false)  
  const [preview, setPreview] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)  
  const ref = useRef(undefined)

  const handleClearForm = () => {
    setTitle('')
    setDescription('')    
    setPreview(null)    
    setImage(null)        
    setIsActive(false)
  }

  const handleCloseForm = () => {
    setIsOpened(false)
  }

  const handleFormState = () => {
    setIsOpened(!isOpened)
  }

  const handleClick = (e) => {
    if (ref && !ref?.current?.contains(e.target)) {
      handleFormState()
    }
  }

  const handleSubmitPost = async () => {
    dispatch(createPost(title, description, image, isVideo))    
    handleClearForm()
    handleCloseForm()
  }

  const startingFunction = () => {
    if (!isOpened || !ref) return
    document.addEventListener('click', handleClick, true)
  }
  const cleanUp = () => {
    document.removeEventListener('click', handleClick)
  }  

  useEffect(() => {    
    startingFunction()
    return cleanUp()
  })

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.openFormIcon} onClick={handleFormState}>
        <i className='fas fa-plus' />
      </div>

      <Popup isOpened={isOpened}>
        <div className={styles.formContainer} ref={ref}>
          <div className={styles.createPostHeader}>
            <i className='far fa-times-circle' onClick={handleFormState} />
            <div className={styles.spacer}>
              <h1>Create Post</h1>
            </div>
            <div className={styles.postBtnContainer}>
              <div className={styles.postBtn} onClick={handleSubmitPost}>
                Post
              </div>
            </div>
          </div>

          <div className={styles.createPostForm}>            
            
            <div className={styles.secondPart}>
              <div className={styles.mediaGroup}>
                <div className={styles.media}>
                  <DragOrDrop                    
                    image={image}
                    preview={preview}
                    isVideo={isVideo}
                    isActive={isActive}
                    setImage={setImage}
                    setPreview={setPreview}                                        
                    setIsActive={setIsActive}
                    setIsVideo={setIsVideo}
                    noBackground={false}
                    backgroundSize={'auto 100%'}
                  />
                </div>
              </div>
            
            
              <div className={styles.firstPart}>
              <div className={styles.fieldGroup}>
                <label htmlFor='title'>Title:</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type='text'
                  placeholder='Title'
                  name='title'
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor='description'>description:</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder='Description'
                  name='description'
                />
              </div>
            </div>

            
            </div>
          </div>                     
        </div>            
      </Popup>
    </div>
  )
}

export default CreatePost
