import axios from 'axios'
import * as userConstants from '../constants/userConstants'
import * as utils from '.././utils/index'

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
    //  UPDATE USER INFO
    return { error: null, updatedUserLink: `/profile/${utils.string.replaceSpace(updatedUser.name)}/settings` }
  } catch(error) {
    return { error: error.response.data.error }
  }
}


export const getUserAction = () => async (dispatch) => {  
  dispatch({ type: userConstants.GET_USER_INFO_REQUEST })
  try {
    const { data } = await axios.get('/api/user/getUserInfo')
    dispatch({ type: userConstants.GET_USER_INFO_SUCCESS, payload: data })
  }  catch(error) {
    dispatch({type: userConstants.GET_USER_INFO_FAIL, payload: error.response.data.error})
  }
}