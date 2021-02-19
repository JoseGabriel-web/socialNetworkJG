import React, { useState, useEffect } from 'react'  
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../css/homeScreen.module.css'
import Loading from '../components/Loading'
import { getProfile } from '../actions/profileActions'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const profileReducer = useSelector(state => state.profileReducer)
  const { profile } = profileReducer
  const params = useParams()  

  const getUserProfile = () => {
    dispatch(getProfile(params.username))
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  return (
    <div> 
      {profile && (
        <ul>        
          <li>name: {profile.user.name}</li>
          <li>email: {profile.user.email}</li>
          <li>createdAt: {profile.user.createdAt}</li>
          <li>savedPosts: {profile.user.savedPosts}</li>
        </ul>     
      )}
    </div>
  )
}

export default ProfileScreen
