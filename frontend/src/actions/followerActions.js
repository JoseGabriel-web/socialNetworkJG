import axios from 'axios'
import {
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  GET_FOLLOWER_LIST_FAIL,
  GET_FOLLOWER_LIST_REQUEST,
  GET_FOLLOWER_LIST_SUCCESS
} from '../constants/followerConstants'

export const getProfileFollowersInfo = (profileUserId, userId) => async (dispatch, getState) => {
  dispatch({type: GET_FOLLOWER_LIST_REQUEST})
  try {
    const config = {
      params: {
        profileUserId, 
        userId
      }
    }
    const { data } = await axios.get('/api/followers/getFollowersInfo', config)
    dispatch({type: GET_FOLLOWER_LIST_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: GET_FOLLOWER_LIST_FAIL, payload: error.response.data})
  }
}

export const follow = (profileUserId, userId, alternateProfileUserId) => async (dispatch, _) => {
  dispatch({type: FOLLOW_USER_REQUEST})
  try {
    const { data } = await axios.put('/api/followers/follow', { userId: profileUserId })
    const { message } = await data    
    dispatch({type: FOLLOW_USER_SUCCESS, payload: await message})
    if(alternateProfileUserId) {      
      dispatch(getProfileFollowersInfo(alternateProfileUserId, userId))
    } else {
      dispatch(getProfileFollowersInfo(profileUserId, userId))
    }
  } catch (error) {
    dispatch({type: FOLLOW_USER_FAIL, payload: error.response.data})
  }
}

export const unFollow = (profileUserId, userId, alternateProfileUserId) => async (dispatch, _) => {
  dispatch({type: UNFOLLOW_USER_REQUEST})

  const config = {
    params: {
      userId: profileUserId
    },
  }  

  try {
    const { data } = await axios.delete('/api/followers/unfollow', config)
    const { message } = await data    
    dispatch({type: UNFOLLOW_USER_SUCCESS, payload: await message})
    if(alternateProfileUserId) {      
      dispatch(getProfileFollowersInfo(alternateProfileUserId, userId))
    } else {
      dispatch(getProfileFollowersInfo(profileUserId, userId))
    }
  } catch (error) {
    dispatch({type: UNFOLLOW_USER_FAIL, payload: error.response.data})
  }
}