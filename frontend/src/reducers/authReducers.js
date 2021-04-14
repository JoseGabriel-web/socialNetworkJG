import * as authConstants from '../constants/authConstants'


export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return {loading: true}        
    case authConstants.REGISTER_SUCCESS:
      return {laoding: false}        
    case authConstants.REGISTER_FAIL:
      return {loading: false, message: action.payload}        
    default:
      return state
  }
}

export const loginReducer = (state = {}, action) => {  
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {loading: true}        
    case authConstants.LOGIN_SUCCESS:
      return {laoding: false}        
    case authConstants.LOGIN_FAIL:
      return {loading: false, message: action.payload}        
    default:
      return state
  }
}

export const logoutReducer = (state = {}, action) => {  
  switch (action.type) {
    case authConstants.LOGOUT_FAIL:
      return {loading: false}        
    case authConstants.LOGOUT_REQUEST:
      return {laoding: true}
    case authConstants.LOGOUT_SUCCESS:
      return {loading: false}        
    default:
      return state
  }
}