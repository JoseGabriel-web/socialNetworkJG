import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS
} from '../constants/profileConstants'

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_FAIL:
      return {loading: false, error: action.payload}
    case GET_PROFILE_REQUEST:
      return {loading: true}
    case GET_PROFILE_SUCCESS:
      return {loading: false, profile: action.payload}  
    default:
      return state
  }
}