import {
  UPDATE_PROFILE_PICTURE_FAIL,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_SUCCESS  
} from '../constants/profilePictureConstants'

export const updateProfilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PICTURE_FAIL:
      return {loading: false, updatedProfilePicture: null}
    case UPDATE_PROFILE_PICTURE_REQUEST:
      return {loading: true, updatedProfilePicture: null}
    case UPDATE_PROFILE_PICTURE_SUCCESS:
      return {loading: false, updatedProfilePicture: action.payload }
    default:
      return state
  }
}