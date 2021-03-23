import axios from 'axios'
import * as authConstants from '../constants/authConstants'
import { token } from '.././utils/index'


export const registerAction = (name, email, password, history) => async (dispatch, getState) => {
  dispatch({type: authConstants.REGISTER_REQUEST})  

  try {
    const { data } = await axios.post('/api/auth/register', { name, email, password })    
    token.setAccessToken(data.accessToken)
    token.setRefreshToken(data.refreshToken) 
    dispatch({type: authConstants.REGISTER_SUCCESS}) 
    return history.push('/')
  } catch (error) {        
    dispatch({type: authConstants.REGISTER_FAIL, payload: error.response.data.error})
  }
}

export const loginAction = (email, password, history) => async (dispatch, getState) => {
  dispatch({type: authConstants.LOGIN_REQUEST})    
  try {
    const { data } = await axios.post('/api/auth/login', { email, password })
    token.setAccessToken(data.accessToken)
    token.setRefreshToken(data.refreshToken)     
    dispatch({ type: authConstants.LOGIN_SUCCESS }) 
    return history.push('/')          
  } catch (error) {    
    dispatch({ type: authConstants.LOGIN_FAIL, payload: error.response.data.error })
  }
}