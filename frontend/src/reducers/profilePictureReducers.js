import {
  UPDATE_PROFILE_PICTURE_FAIL,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS  
} from '../constants/profilePictureConstants'

export const changeProfilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PICTURE_FAIL:
      return {loading: false, profilePictureURL: null}
    case UPDATE_PROFILE_PICTURE_REQUEST:
      return {loading: true, profilePictureURL: null}
    case UPDATE_PROFILE_PICTURE_SUCCESS:
      return {loading: false, profilePicture: action.payload }
    default:
      return state
  }
}