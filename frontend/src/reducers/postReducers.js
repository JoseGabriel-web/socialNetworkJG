import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS
} from '../constants/postConstants'

export const getPostsReducer = (state = [], action) => {
  switch (action.type) {
    case '':
      return {}
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
export const deletePostReducer = (state = [], action) => {
  switch (action.type) {
    case '':
      return {}
    default:
      return state
  }
}