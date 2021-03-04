import axios from 'axios'
import {
  CREATE_POST_COMMENT_FAIL,
  CREATE_POST_COMMENT_REQUEST,
  CREATE_POST_COMMENT_SUCCESS,
  DELETE_POST_COMMENT_FAIL,
  DELETE_POST_COMMENT_REQUEST,
  DELETE_POST_COMMENT_SUCCESS,
} from '../constants/postCommentConstants'


export const createPostComment = (postId, label) => async (dispatch, getState) => {
  dispatch({type: CREATE_POST_COMMENT_REQUEST})
  const { loginReducer } = getState()
  const { user } = loginReducer
  const { accessToken } = user

  const config = {
    headers: {           
      'Content-type': 'application/json',      
      authorization: `Bearer ${accessToken}`,
    },
  }

  const body = {
    postId,
    label
  }

  try {
    const { data } = await axios.post('/api/post/comment/createPostComment', body, config)
    const { newComment } = await data
    console.log(data)
    dispatch({type: CREATE_POST_COMMENT_SUCCESS, payload: newComment})
    return { newComment }
  } catch(error) {    
    dispatch({type: CREATE_POST_COMMENT_FAIL, payload: error.response.data.error})
    return { newComment: null }
  }
}

export const deletePostComment = (postId, label) => async (dispatch, getState) => {
  dispatch({ type: DELETE_POST_COMMENT_REQUEST })
  const { loginReducer } = getState()
  const { user } = loginReducer
  const { accessToken } = user

  const config = {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    params: {
      postId, 
      label, 
    },
  }

  try {
    const { data } = await axios.delete('/api/post/comment/deletePostComment', config)
    const { message } = await data
    console.log(data)
    dispatch({type: DELETE_POST_COMMENT_SUCCESS, payload: message})
    return { isDeleted: true }
  } catch (error) {    
    dispatch({ type: DELETE_POST_COMMENT_FAIL, payload: error.response.data.error })
    return { isDeleted: false }
  }
}