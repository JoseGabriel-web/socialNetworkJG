import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import CreatePostDragOrDrop from './CreatePostDragOrDrop'
import styles from '../css/createPost.module.css'
import { createPost } from '../actions/postActions'

const CreatePost = () => {
  const dispatch = useDispatch()
  const [isOpened, setIsOpened] = useState(false)  
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [postFile, setPostFile] = useState(null)  
  const ref = useRef(undefined)

  const handleClearForm = () => {
    setTitle('')
    setDescription('')    
    setPreview(null)    
    setImage(null)    
    setPostFile(null)
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
    dispatch(createPost(title, description, image))    
    handleClearForm()
    handleCloseForm()
  }

  useEffect(() => {
    const functions = {
      startingFunction: () => {
        if (!isOpened || !ref) return
        document.addEventListener('click', handleClick, true)
      },
      cleanUp: () => {
        document.removeEventListener('click', handleClick)
      },
    }
    functions.startingFunction()
    return functions.cleanUp()
  })

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.openFormIcon} onClick={handleFormState}>
        <i className='fas fa-plus' />
      </div>

      <div
        className={styles.popUpContainer}
        style={{ display: isOpened ? 'flex' : 'none' }}
      >
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

            <div className={styles.secondPartlabel}>
              <strong>Image:</strong>
            </div>
            <div className={styles.secondPart}>
              <div className={styles.mediaGroup}>
                <div className={styles.media}>
                  <CreatePostDragOrDrop
                    isActive={isActive}
                    setIsActive={setIsActive}
                    preview={preview}
                    setPreview={setPreview}                    
                    postFile={postFile}
                    setPostFile={setPostFile}
                    setImage={setImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
