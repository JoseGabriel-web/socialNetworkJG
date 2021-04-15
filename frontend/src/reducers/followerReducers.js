import * as followerConstants from '../constants/followerConstants'

export const followersInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case followerConstants.GET_FOLLOWERS_INFO_FAIL:          
      return {loading: false, error: action.payload }
    case followerConstants.GET_FOLLOWERS_INFO_REQUEST:
      return {loading: true}
    case followerConstants.GET_FOLLOWERS_INFO_SUCCESS:
      return { loading: false, followersList: action.payload.followersList, followingList: action.payload.followingList }
    default:
      return state
  }
}
export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case followerConstants.FOLLOW_USER_FAIL:          
      return {loading: false, error: action.payload }
    case followerConstants.FOLLOW_USER_REQUEST:
      return {loading: true}
    case followerConstants.FOLLOW_USER_SUCCESS:
      return {loading: false, message: action.payload}
    default:
      return state
  }
}
export const unFollowUserReducer = (state = {}, action) => {
  switch (action.type) {
    case followerConstants.UNFOLLOW_USER_FAIL:          
      return {loading: false, error: action.payload }
    case followerConstants.UNFOLLOW_USER_REQUEST:
      return {loading: true}
    case followerConstants.UNFOLLOW_USER_SUCCESS:
      return {loading: false, message: action.payload}
    default:
      return state
  }
}