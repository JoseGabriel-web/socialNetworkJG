import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../css/profileFollowers.module.css'
import Loading from './Loading'

const ProfileFollowers = () => {
  const profileReducer = useSelector((state) => state.profileReducer)
  const { profile, loading = true } = profileReducer

  return (
    <div>
      
    </div>
  )
}

export default ProfileFollowers
