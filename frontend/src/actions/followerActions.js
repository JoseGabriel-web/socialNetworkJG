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
import * as utils from '.././utils/index'

export const getProfileFollowersList = (username) => async (dispatch, getState) => {
  dispatch({type: GET_FOLLOWER_LIST_REQUEST})

  try {
    const { data } = await axios.get(`/api/followers/getFollowers/${utils.string.replaceSpace(username)}`)
    const { followersList } = await data
    console.log(data, ' This comes from followers actions')
    dispatch({type: GET_FOLLOWER_LIST_SUCCESS, payload: followersList})
  } catch (error) {
    dispatch({type: GET_FOLLOWER_LIST_FAIL, payload: error.response.data})
  }
}

export const follow = (followerName, userToFollowName, followerCount) => async (dispatch, getState) => {
  dispatch({type: FOLLOW_USER_REQUEST})

  const config = {
    followerName, 
    userToFollowName
  }

  try {
    const { data } = await axios.put('/api/followers/follow', config)
    const { message } = await data    
    dispatch({type: FOLLOW_USER_SUCCESS, payload: await message})
    dispatch(getProfileFollowersList(userToFollowName))
    return { newFollowersCount: followerCount + 1 }
  } catch (error) {
    dispatch({type: FOLLOW_USER_FAIL, payload: error.response.data})
  }
}

export const unFollow = (followerName, userToUnFollowName, followerCount) => async (dispatch, getState) => {
  dispatch({type: UNFOLLOW_USER_REQUEST})

  const config = {
    headers: {
      'Content-type': 'application/json',      
    },
    params: {
      followerName, 
      userToUnFollowName
    },
  }  

  try {
    const { data } = await axios.delete('/api/followers/unfollow', config)
    const { message } = await data    
    dispatch({type: UNFOLLOW_USER_SUCCESS, payload: await message})    
    dispatch(getProfileFollowersList(userToUnFollowName))    
    return { newFollowersCount: followerCount - 1 }
  } catch (error) {
    dispatch({type: UNFOLLOW_USER_FAIL, payload: error.response.data})
  }
}