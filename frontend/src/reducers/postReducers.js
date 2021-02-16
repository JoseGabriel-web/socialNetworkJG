import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  LIKE_POST,
  LIKE_POST_FAIL,
  UNLIKE_POST,
  UNLIKE_POST_FAIL
} from '../constants/postConstants'

export const getPostsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POSTS_FAIL:
      return {loading: false, message: action.payload}
    case GET_POSTS_REQUEST:
      return {loading: true}
    case GET_POSTS_SUCCESS:
      return {loading: false, posts: action.payload}
    default:
      return state
  }
}
export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_FAIL:
      return {loading: false, message: action.payload}
    case CREATE_POST_REQUEST:
      return {loading: true}
    case CREATE_POST_SUCCESS:
      return {loading: false, post: action.payload}
    default:
      return state
  }
}
export const updatePostReducer = (state = [], action) => {
  switch (action.type) {
    case '':
      return {}
    default:
      return state
  }
}

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST:
      return {action: action.payload}
    case LIKE_POST_FAIL:
      return {error: action.payload}
    case UNLIKE_POST:
      return {action: action.payload}
    case UNLIKE_POST_FAIL:
      return {error: action.payload}
    default:
      return state
  }
}

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_FAIL:
      return {loading: false, message: action.payload}
    case DELETE_POST_REQUEST:
      return {loading: true}
    case DELETE_POST_SUCCESS:
      return {loading: false, post: action.payload}
    default:
      return state
  }
}