import React from 'react'
import styles from '../../css/layout/dragOrDrop.module.css'

const DragOrDrop = ({ setImage, preview, setPreview, isActive, setIsActive, noBackground, backgroundSize }) => {      

  const handleIsVideo = () => {        
    
  }
  
  const handleIsImage = (file) => {        
    setImage(file) 
    setPreview(window.URL.createObjectURL(new Blob([file], {type: 'application/zip'})))   
  }

  const handleDragOver = (e) => {
    e.preventDefault()    
    setIsActive(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()    
    setIsActive(false)
  }
  const handleDrop = async (e) => {
    e.preventDefault()
    let file = e.dataTransfer.files[0]   
    if(file.type.match('video.*')) return handleIsVideo()      
    handleIsImage(file)              
  }

  const handleInput = (e) => {
    e.preventDefault()
    let file = e.target.files[0]          
    if(file.type.match('video.*')) return handleIsVideo()      
    handleIsImage(file)
  }

  return (
    <div
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      className={`${styles.dragAndDropArea} ${
        isActive || preview ? styles.active : ''
      } ${preview? styles.containerHasFile : ''}`}
      style={{background: preview && !noBackground? `url(${preview})` : ''}}      
    >
      {preview ? (
        <div className={preview? styles.hasFile : ''}  style={{backgroundImage: preview? `url(${preview})` : '', backgroundSize}} height='100%' width='100%' />
      ) : (
        <div className={styles.dragAndDropBody}>
          {isActive ? (
            <>  
              <h5>Drop</h5>
              <i className='fas fa-fist-raised' />
            </>
          ) : (
            <div className={styles.dragUploadImgBanner}>
              <h5>Drag</h5>          
              <i className='fas fa-hand-holding' />
              <label className={styles.uploadFileLabelBtn} htmlFor='file'>
                <h4>Upload Img</h4> 
                <i className='fas fa-cloud-upload-alt' />
              </label>
              <input  onChange={e => handleInput(e)} type='file' id='file' className={styles.inputFile} />
            </div>
          )}               
        </div>
      )}           
    </div>
  )
}

export default DragOrDrop