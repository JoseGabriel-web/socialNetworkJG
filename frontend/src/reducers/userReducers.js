import * as userConstants from '../constants/userConstants'

const savedUser = { user: JSON.parse(localStorage.getItem('user')) } || {}

export const userInfoReducer = (state = savedUser, action) => {  
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

export const getAllUsersReducer = (state = {}, action) => {  
  switch (action.type) {
    case userConstants.GET_ALL_USERS_FAIL:
      return { loading: false }        
    case userConstants.GET_ALL_USERS_REQUEST:
      return {loading: true}        
    case userConstants.GET_ALL_USERS_SUCCESS:
      return { laoding: false, users: action.payload }        
    default:
      return state
  }
}