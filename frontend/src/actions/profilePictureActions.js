import axios from 'axios'
import {
  UPDATE_PROFILE_PICTURE_FAIL,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS  
} from '../constants/profilePictureConstants'

export const updateProfilePicture = (image) => async (dispatch, getState) => {
  dispatch({type: UPDATE_PROFILE_PICTURE_REQUEST})  

  const body = new FormData()
  body.append('image', image)  

  try {
    const { data } = await axios.post('/api/user/updateProfilePicture', body)
    const { profilePicture } = await data
    dispatch({type: UPDATE_PROFILE_PICTURE_SUCCESS, payload: profilePicture})
  } catch(error) {
    console.log(error.response.data.error)    
    dispatch({type: UPDATE_PROFILE_PICTURE_FAIL})
  }
}