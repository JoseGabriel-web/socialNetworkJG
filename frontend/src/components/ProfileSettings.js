import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/profileSettings.module.css'
import Loading from './Loading'

const ProfileSettings = () => {
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile, loading = true } = profileReducer
  
  
  return (
    <div className={styles.profileSettingsContainer}>

      <div className={styles.profileSettingsHeader}>
        <h1>Settings</h1>
        <p>Here you can add, update and delete your information and set application preferences.</p>
      </div>

      <div className={styles.informationPreferencesSaveOrDeleteContainer}>
        <div className={styles.informationContainer}>
          <div className={styles.fieldGroup}>            
            <label htmlFor='username'><strong>Username:</strong></label>
            <input type='text' name='username' id='username' placeholder={`${profile && profile.user.name}`} />
          </div>
          <div className={styles.fieldGroup}>            
            <label htmlFor='email'><strong>Email:</strong></label>
            <input type='email' name='email' id='email' placeholder={`${profile && profile.user.email}`} />
          </div>
          <div className={styles.fieldGroup}>            
            <label htmlFor='password'><strong>Password:</strong></label>
            <input type='password' name='password' id='password' placeholder='Enter new password' />
          </div>
        </div>
        <div className={styles.preferencesSaveOrDeleteContainer}>
          <div className={styles.preferencesContainer}>
            
          </div>
          <div className={styles.saveOrDeleteContainer}>
            <div className={styles.deleteAccountBtn}>
              <i className='fas fa-trash' />
              <strong>Delete Account</strong>
            </div>
            <div className={styles.saveChangesBtn}>
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

      {/* {loading? (
        <Loading />
      ) : profile ? (
        JSON.stringify(profile)
      ) : 'Check internet connection or Invalid URL'} */}