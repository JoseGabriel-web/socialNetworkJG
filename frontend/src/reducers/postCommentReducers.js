import {
  CREATE_POST_COMMENT_FAIL,
  CREATE_POST_COMMENT_REQUEST,
  CREATE_POST_COMMENT_SUCCESS,
  DELETE_POST_COMMENT_FAIL,
  DELETE_POST_COMMENT_REQUEST,
  DELETE_POST_COMMENT_SUCCESS,
} from '../constants/postCommentConstants'

export const createPostComment = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_COMMENT_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_POST_COMMENT_REQUEST:
      return { loading: true }
    case CREATE_POST_COMMENT_SUCCESS:
      return { loading: false, newComment: action.payload }
    default:
      return state
  }
}
export const deletePostComment = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_COMMENT_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_POST_COMMENT_REQUEST:
      return { loading: true }
    case DELETE_POST_COMMENT_SUCCESS:
      return { loading: false, message: action.payload }
    default:
      return state
  }
}