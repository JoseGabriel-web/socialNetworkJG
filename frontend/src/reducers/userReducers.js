import * as userConstants from '../constants/userConstants'

export const userInfoReducer = (state = {}, action) => {  
  switch (action.type) {
    case userConstants.GET_USER_INFO_REQUEST:
      return {loading: true}        
    case userConstants.GET_USER_INFO_SUCCESS:
      return {laoding: false, user: action.payload}        
    case userConstants.GET_USER_INFO_FAIL:
      return {loading: false, message: action.payload}        
    default:
      return state
  }
}