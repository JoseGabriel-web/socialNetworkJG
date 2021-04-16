import axios from 'axios'
import * as profileConstants from '../constants/profileConstants'

export const getProfile = (username, history) => async (dispatch) => {  
  try {    
    dispatch({ type: profileConstants.GET_PROFILE_REQUEST })
    const { data } = await axios.get(`/api/profile/getProfile/${username}`)
    const { profile } = await data    
    dispatch({ type: profileConstants.GET_PROFILE_SUCCESS, payload: await profile })   
    if(profile) return { followers: profile.user.followers }
  } catch (error) {    
    console.log(error.response)
    if(history && error && error?.response?.data?.error?.status === 404) {
      return history.push('/notfound')
    }
    dispatch({ type: profileConstants.GET_PROFILE_FAIL, payload: error.response.data.error })       
  }
}