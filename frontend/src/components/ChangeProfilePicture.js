import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../css/changeProfilePicture.module.css'
import { updateProfilePicture } from '../actions/profilePictureActions'
import DragOrDrop from '../components/DragOrDrop'
import Popup from '../components/Popup'

const ChangeProfilePicture = ({ setEditProfilePicturePopUpState, editProfilePicturePopUpState, }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [isActive, setIsActive] = useState(null)
  const [preview, setPreview] = useState(null)

  const handlePopUpState = () => {
    setEditProfilePicturePopUpState(false)
  }

  const handleUpdateProfilePicture = () => {
    dispatch(updateProfilePicture(image))
  }

  return (
    <Popup isOpened={editProfilePicturePopUpState} onClick={handlePopUpState}>
      <div className={styles.changeProfilePictureContainer}>
        <div className={styles.dragOrDropContainer}>
          <DragOrDrop
            setImage={setImage}
            preview={preview}
            setPreview={setPreview}
            isActive={isActive}
            setIsActive={setIsActive}
            noBackground={true}
            backgroundSize={'100%'}
          />        
        </div>
        <div className={`fas fa-check ${styles.uploadProfilePictureCheck}`} onClick={handleUpdateProfilePicture} />
        <div className={`fas fa-times ${styles.uploadProfilePictureClose}`} onClick={handlePopUpState} />
      </div>
    </Popup>
  )
}

export default ChangeProfilePicture
