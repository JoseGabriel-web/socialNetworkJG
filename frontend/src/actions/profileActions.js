import axios from 'axios'
import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS
} from '../constants/profileConstants'
import { getProfileFollowersList } from './followerAction'

export const getProfile = (username) => async (dispatch, getState) => {
  dispatch({ type: GET_PROFILE_REQUEST })
  
  try {    
    const { data } = await axios.get(`/api/profile/getProfile/${username}`)
    const { profile } = await data
    dispatch({ type: GET_PROFILE_SUCCESS, payload: await profile })   
    if(profile) return { followers: profile.user.followers }
  } catch (error) {    
    dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data.error })
    return { followers: [] }
  }
}