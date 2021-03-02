import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/profileSettings.module.css'
import Loading from './Loading'

const ProfileSettings = () => {
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile, loading = true } = profileReducer
  
  
  return (
    <div>
      {loading? (
        <Loading />
      ) : profile ? (
        JSON.stringify(profile)
      ) : 'Check internet connection or Invalid URL'}
    </div>
  )
}

export default ProfileSettings
