import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from '../constants/userConstants'


export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {loading: true}        
    case USER_REGISTER_SUCCESS:
      return {laoding: false, user: action.payload}        
    case USER_REGISTER_FAIL:
      return {loading: false, message: action.payload}        
    default:
      return state
  }
}

const initialState = localStorage.getItem('user') === null? {} : {user: JSON.parse(localStorage.getItem('user'))}

export const loginReducer = (state = initialState, action) => {  
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {loading: true}        
    case USER_LOGIN_SUCCESS:
      return {laoding: false, user: action.payload}        
    case USER_LOGIN_FAIL:
      return {loading: false, message: action.payload}        
    default:
      return state
  }
}