import axios from 'axios'
import {
  UPDATE_PROFILE_PICTURE_FAIL,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS  
} from '../constants/profilePictureConstants'

export const updateProfilePicture = (image) => async (dispatch, getState) => {
  dispatch({type: UPDATE_PROFILE_PICTURE_REQUEST})
  const { loginReducer } = getState()
  const { user } = loginReducer
  const { accessToken } = user

  const body = new FormData()
  body.append('image', image)  

  const config = {
    headers: {           
      'Content-type': 'application/json',       
      authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    const { data } = await axios.post('/api/user/updateProfilePicture', body, config)
    const { profilePicture } = await data
    dispatch({type: UPDATE_PROFILE_PICTURE_SUCCESS, payload: profilePicture})
  } catch(error) {
    dispatch({type: UPDATE_PROFILE_PICTURE_FAIL})
  }
}