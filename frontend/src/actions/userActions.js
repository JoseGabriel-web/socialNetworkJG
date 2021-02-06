import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const registerAction = (name, email, password) => async (dispatch, getState) => {
  dispatch({type: USER_REGISTER_REQUEST})  
  

  const body = {
    name,
    email,
    password
  }

  try {
    const { data } = await axios.post('/api/user/register', body)    
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({type: USER_REGISTER_SUCCESS, payload: data})    
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})    
  } catch (error) {
    dispatch({type: USER_REGISTER_FAIL, payload: error.response.data.message})
  }
}

export const loginAction = (email, password) => async (dispatch, getState) => {
  dispatch({type: USER_LOGIN_REQUEST})  
  

  const body = {    
    email,
    password
  }

  try {
    const { data } = await axios.post('/api/user/login', body)    
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    console.log(data)
  } catch (error) {
    dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.message})
  }
}