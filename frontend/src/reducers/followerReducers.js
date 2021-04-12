import {
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  GET_FOLLOWER_LIST_FAIL,
  GET_FOLLOWER_LIST_REQUEST,
  GET_FOLLOWER_LIST_SUCCESS
} from '../constants/followerConstants'

export const userFollowersListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FOLLOWER_LIST_FAIL:          
      return {loading: false, error: action.payload }
    case GET_FOLLOWER_LIST_REQUEST:
      return {loading: true}
    case GET_FOLLOWER_LIST_SUCCESS:
      return { loading: false, followersList: action.payload.followersList, followingList: action.payload.followingList }
    default:
      return state
  }
}
export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_USER_FAIL:          
      return {loading: false, error: action.payload }
    case FOLLOW_USER_REQUEST:
      return {loading: true}
    case FOLLOW_USER_SUCCESS:
      return {loading: false, message: action.payload}
    default:
      return state
  }
}
export const unFollowUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFOLLOW_USER_FAIL:          
      return {loading: false, error: action.payload }
    case UNFOLLOW_USER_REQUEST:
      return {loading: true}
    case UNFOLLOW_USER_SUCCESS:
      return {loading: false, message: action.payload}
    default:
      return state
  }
}