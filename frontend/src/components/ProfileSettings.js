import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserAction } from '../actions/userActions'
import styles from '../css/profileSettings.module.css'
import Loading from './Loading'

const ProfileSettings = ({ history }) => {
  const dispatch = useDispatch()
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile, loading = true } = profileReducer
  const [newName, setNewName] = useState(null)
  const [newEmail, setNewEmail] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [errorField, setErrorField] = useState(null)

  const handleUpdate = async () => {
    if (newName || newEmail || newPassword) {
      const { error, updatedUserLink } = await dispatch(
        updateUserAction(newName, newEmail, newPassword)
      )
      if (error) {
        setErrorField(error.field)
      }
      else {
        handleClearForm()
        history.push(updatedUserLink)
      }
    }
    console.log('Insert new values')
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
            <input
              className={`${errorField && errorField === 'name'? styles.errorField : ''}`}
              onChange={(e) => setNewName(e.target.value)}
              type='text'
              name='username'
              id='username'
              placeholder={`${profile && profile.user.name}`}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor='email'>
              <strong>Email:</strong>
            </label>
            <input
              className={`${errorField && errorField === 'email'? styles.errorField : ''}`}
              onChange={(e) => setNewEmail(e.target.value)}
              type='email'
              name='email'
              id='email'
              placeholder={`${profile && profile.user.email}`}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor='password'>
              <strong>New Password:</strong>
            </label>
            <input              
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type='password'
              name='password'
              id='password'
              placeholder='Enter new password'
            />
          </div>
        </div>
        <div className={styles.preferencesSaveOrDeleteContainer}>
          <div className={styles.preferencesContainer}></div>
          <div className={styles.saveOrDeleteContainer}>
            <div className={styles.deleteAccountBtn}>
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
    </div>
  )
}

export default ProfileSettings