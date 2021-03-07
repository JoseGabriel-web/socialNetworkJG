import axios from 'axios'
import { GET_PROFILE_SUCCESS } from '../constants/profileConstants'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

const replaceSpace = (string) => {
  return string?.split(' ').join('+')
}

export const registerAction = (name, email, password, history) => async (dispatch, getState) => {
  dispatch({type: USER_REGISTER_REQUEST})  
  

  const body = {
    name,
    email,
    password
  }

  try {
    const { data } = await axios.post('/api/user/register', body)    
    localStorage.setItem('user', JSON.stringify(data))      
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})   
    return history.push('/home')
  } catch (error) {        
    dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.error})
  }
}

export const loginAction = (email, password, history) => async (dispatch, getState) => {
  dispatch({type: USER_LOGIN_REQUEST})  
  

  const body = {    
    email,
    password
  }

  try {
    const { data } = await axios.post('/api/user/login', body)    
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    return history.push('/home')    
  } catch (error) {    
    dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.error})
  }
}

export const updateUserAction = (name, email, password) => async (dispatch, getState) => {  
  const { loginReducer } = getState()
  const { user } = loginReducer
  const { accessToken } = user   

  const config = {
    headers: {           
      'Content-type': 'application/json',       
      authorization: `Bearer ${accessToken}`,
    },
  }

  const body = {
    name,
    email,
    password
  }

  try {
    const { data } = await axios.post('/api/user/updateUser', body, config)
    const { updatedUser } = await data      
    const updatedLoginInfo = {
      name: await updatedUser.name,
      email: await updatedUser.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken
    }    
    dispatch({type: USER_LOGIN_SUCCESS, payload: await updatedLoginInfo })     
    return { error: null, updatedUserLink: `/profile/${replaceSpace(updatedUser.name)}/settings` }
  } catch(error) {
    return { error: error.response.data.error }
  }
}