import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserAction } from '../../actions/userActions'
import styles from '../../css/profile/profileSettings.module.css'
import * as userActions from '../../actions/userActions'
import Popup from '../layout/Popup'

const ProfileSettings = ({ history }) => {

  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile } = profileReducer
  const [newName, setNewName] = useState(null)
  const [newEmail, setNewEmail] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [errorField, setErrorField] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [deleteAccPopUpState, setDeleteAccPopUpState] = useState(false)

  const handleDeleteAccPopUp = () => {
    setDeleteAccPopUpState(!deleteAccPopUpState)
  }

  const handleDeleteAccount = () => {
    handleDeleteAccPopUp()
    dispatch(userActions.deleteUserAccountAction())    
    history.push('/register')    
  }  

  const handleUpdate = async () => {
    if (newName || newEmail || newPassword) {
      const { error, updatedUserLink } = await dispatch(
        updateUserAction(newName, newEmail, newPassword)
      )
      if (error) {
        setErrorField(error.field)
        setErrorMessage(error.message)
      } else {
        handleClearForm()
        history.push(updatedUserLink)
      }
    }    
  }

  const handleClearForm = () => {
    setNewName(null)
    setNewEmail(null)
    setNewPassword(null)
    setErrorField(null)
  }

  return (
    <div className={styles.profileSettingsContainer}>
      <div className={styles.profileSettingsHeader}>
        <h1>Settings</h1>
        <p>
          Here you can add, update and delete your information and set
          application preferences.
        </p>
      </div>

      <div className={styles.informationPreferencesSaveOrDeleteContainer}>
        <div className={styles.informationContainer}>
          <div className={styles.fieldGroup}>
            <label htmlFor='username'>
              <strong>Username:</strong>
            </label>

            <div className={styles.inputAndTooltipContainer}>
              <input                
                onChange={(e) => { setNewName(e.target.value); setErrorField(null); }}
                value={newName}
                type='text'
                name='username'
                id='username'
                placeholder={`${profile && profile.user.name}`}
              />

              <div>                              
                <div
                  className={`${
                    errorField && errorField === 'name'
                      ? 'fas fa-times-circle'
                      : 'fas fa-info-circle'
                  } ${styles.tooltip}`}
                >
                </div>
                <div className={styles.tooltipText}>
                  {errorField && errorField === 'name'
                        ? errorMessage
                        : 'Here goes errors'
                    }
                </div>              
              </div>

            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor='email'>
              <strong>Email:</strong>
            </label>

            <div className={styles.inputAndTooltipContainer}>
              <input
                onChange={(e) => { setNewEmail(e.target.value); setErrorField(null); }}
                value={newEmail}
                type='email'
                name='email'
                id='email'
                placeholder={`${profile && profile.user.email}`}
              />

              <div>                              
                <div
                  className={`${
                    errorField && errorField === 'email'
                      ? 'fas fa-times-circle'
                      : 'fas fa-info-circle'
                  } ${styles.tooltip}`}
                >
                </div>
                <div className={styles.tooltipText}>
                  {errorField && errorField === 'email'
                        ? errorMessage
                        : 'Here goes errors'
                    }
                </div>              
              </div>

            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor='password'>
              <strong>Password:</strong>
            </label>

            <div className={styles.inputAndTooltipContainer}>
              <input
                onChange={(e) => { setNewPassword(e.target.value); setErrorField(null); }}
                value={newPassword}
                type='password'
                name='password'
                id='password'
                placeholder='Enter new password'
              />

              <div>                              
                <div
                  className={`${
                    errorField && errorField === 'password'
                      ? 'fas fa-times-circle'
                      : 'fas fa-info-circle'
                  } ${styles.tooltip}`}
                >
                </div>
                <div className={styles.tooltipText}>
                  {errorField && errorField === 'password'
                        ? errorMessage
                        : 'Here goes errors'
                    }
                </div>              
              </div>

            </div>
          </div>
        </div>
        <div className={styles.preferencesSaveOrDeleteContainer}>
          <div className={styles.preferencesContainer}></div>
          <div className={styles.saveOrDeleteContainer}>
            <div className={styles.deleteAccountBtn} onClick={handleDeleteAccPopUp}>
              <i className='fas fa-trash' />
              <strong>Delete Account</strong>
            </div>
            <div className={styles.saveChangesBtn} onClick={handleUpdate}>
              <i className='fas fa-save' />
              <strong>Save changes</strong>
            </div>
          </div>
        </div>
      </div>
      <Popup isOpened={deleteAccPopUpState}>
        <div className={styles.deleteAccPopUpContainer}>
          
          <h2>Are you sure?</h2>
          <div className={styles.deleteAccPopUpBtnsContainer}>

            <div className={styles.confirmDeleteBtn} onClick={handleDeleteAccount}>Yes, Delete Account</div>
            <div className={styles.cancelDeleteBtn} onClick={handleDeleteAccPopUp}>No, close</div>

          </div>

        </div>
      </Popup>
    </div>
  )
}

export default ProfileSettings
