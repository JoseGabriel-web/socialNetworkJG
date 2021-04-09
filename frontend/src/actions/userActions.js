import axios from 'axios'
import * as userConstants from '../constants/userConstants'
import * as utils from '.././utils/index'
import * as chatRoomConstants from '../constants/chatRoomConstants'
import { socket } from '../Layout'

export const updateUserAction = (name, email, password) => async (dispatch, getState) => {  
  const userInfoReducer = getState().userInfoReducer
  const { user } = userInfoReducer
  const disconnectName = user.name
  socket.emit('disconectUser', { name: disconnectName })

  try {
    const { data } = await axios.post('/api/user/updateUser', { name, email, password })     
    dispatch({ type: userConstants.GET_USER_INFO_SUCCESS, payload: data })
    dispatch({ type: chatRoomConstants.GET_CHATROOM_FAIL })
    return { error: null, updatedUserLink: `/profile/${utils.string.replaceSpace(data.name)}/settings` }
  } catch(error) {
    return { error: error.response.data.error }
  }
}


export const getUserAction = () => async (dispatch) => {  
  dispatch({ type: userConstants.GET_USER_INFO_REQUEST })
  try {
    const { data } = await axios.get('/api/user/getUserInfo')
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({ type: userConstants.GET_USER_INFO_SUCCESS, payload: data })
  }  catch(error) {
    dispatch({type: userConstants.GET_USER_INFO_FAIL, payload: error.response.data.error})
  }
}

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST })
    const { data } = await axios.get('/api/user/getAllUsers')
    console.log(' Getting all users from sidebar chat -> ',data.users)
    dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: data.users })
  } catch(error) {
    console.log('Getting all posts Error -> ',error.response)
    dispatch({ type: userConstants.GET_ALL_USERS_FAIL })
  }
}