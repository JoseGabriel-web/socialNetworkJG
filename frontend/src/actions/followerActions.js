import axios from 'axios'
import * as followerConstants from '../constants/followerConstants'

export const getProfileFollowersInfo = (profileUserId, userId) => async (dispatch, getState) => {
  dispatch({type: followerConstants.GET_FOLLOWERS_INFO_REQUEST})
  try {
    const config = {
      params: {
        profileUserId, 
        userId
      }
    }
    const { data } = await axios.get('/api/followers/getFollowersInfo', config)
    dispatch({type: followerConstants.GET_FOLLOWERS_INFO_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: followerConstants.GET_FOLLOWERS_INFO_FAIL, payload: error.response.data})
  }
}

export const follow = (profileUserId, userId, alternateProfileUserId) => async (dispatch, _) => {
  dispatch({type: followerConstants.FOLLOW_USER_REQUEST})
  try {
    const { data } = await axios.put('/api/followers/follow', { userId: profileUserId })
    const { message } = await data    
    dispatch({type: followerConstants.FOLLOW_USER_SUCCESS, payload: await message})
    if(alternateProfileUserId) {      
      dispatch(getProfileFollowersInfo(alternateProfileUserId, userId))
    } else {
      dispatch(getProfileFollowersInfo(profileUserId, userId))
    }
  } catch (error) {
    dispatch({type: followerConstants.FOLLOW_USER_FAIL, payload: error.response.data})
  }
}

export const unFollow = (profileUserId, userId, alternateProfileUserId) => async (dispatch, _) => {
  dispatch({type: followerConstants.UNFOLLOW_USER_REQUEST})

  const config = {
    params: {
      userId: profileUserId
    },
  }  

  try {
    const { data } = await axios.delete('/api/followers/unfollow', config)
    const { message } = await data    
    dispatch({type: followerConstants.UNFOLLOW_USER_SUCCESS, payload: await message})
    if(alternateProfileUserId) {      
      dispatch(getProfileFollowersInfo(alternateProfileUserId, userId))
    } else {
      dispatch(getProfileFollowersInfo(profileUserId, userId))
    }
  } catch (error) {
    dispatch({type: followerConstants.UNFOLLOW_USER_FAIL, payload: error.response.data})
  }
}