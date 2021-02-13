import React from 'react'
import styles from '../css/createPostDragOrDrop.module.css'

const CreatePostDragOrDrop = ({ setImage, preview, setPreview, isActive, setIsActive, setPostFile}) => {    

  const handleDragOver = (e) => {
    e.preventDefault()
    console.log('Drag over')
    setIsActive(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    console.log('Drag leaving')
    setIsActive(false)
  }
  const handleDrop = async (e) => {
    e.preventDefault()
    let file = e.dataTransfer.files[0]        
    setPreview(window.URL.createObjectURL(new Blob([file], {type: 'application/zip'})))        
        
    setImage(file)
  }

  const handleInput = (e) => {
    e.preventDefault()
    let file = e.target.files[0]
    setPostFile(file)        
    setPreview(window.URL.createObjectURL(new Blob([file], {type: 'application/zip'})))   
    setImage(file) 
  }

  return (
    <div
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      className={`${styles.dragAndDropArea} ${
        isActive || preview ? styles.active : ''
      } ${preview? styles.containerHasFile : ''}`}
      style={{background: preview? `url(${preview})` : ''}}      
    >
      {preview ? (
        <>        
        <div className={preview? styles.hasFile : ''}  style={{backgroundImage: preview? `url(${preview})` : ''}} height='100%' width='100%' />
        </>
      ) : (
        <div className={styles.dragAndDropBody}>
          {isActive ? (
            <>  
              <h5>Drop</h5>
              <i className='fas fa-fist-raised' />
            </>
          ) : (
            <>
              <h5>Drag</h5>          
              <i className='fas fa-hand-holding' />
              <label className={styles.uploadFileLabelBtn} htmlFor='file'>
                <h4>Upload Img</h4> 
                <i className='fas fa-cloud-upload-alt' />
              </label>
              <input  onChange={e => handleInput(e)} type='file' id='file' className={styles.inputFile} />
            </>
          )}               
        </div>
      )}           
    </div>
  )
}

export default CreatePostDragOrDrop