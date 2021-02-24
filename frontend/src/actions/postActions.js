import axios from 'axios'
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  LIKE_POST,
  UNLIKE_POST,
  LIKE_POST_FAIL,
  UNLIKE_POST_FAIL,
} from '../constants/postConstants'

export const createPost = (title, description, image) => async (
  dispatch,
  getState
) => {
  dispatch({ type: CREATE_POST_REQUEST })
  const { loginReducer } = getState()
  const { user } = loginReducer
  const { accessToken } = user

  const body = new FormData()
  body.append('title', title)
  body.append('image', image)
  body.append('description', description)  

  const config = {
    headers: {           
      'Content-type': 'application/json',      
      authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    const { data } = await axios.post('/api/post/createPost', body, config)
    const { message } = await data
    dispatch({ type: CREATE_POST_SUCCESS, payload: message })
    dispatch(getPosts())
  } catch (error) {
    console.log('/frontend /postActions.js ->', error)
    dispatch({ type: CREATE_POST_FAIL, payload: error })
  }
}

export const getPosts = () => async (dispatch, getState) => {
  dispatch({ type: GET_POSTS_REQUEST })  
  try {    
    const { data } = await axios.get('/api/post/getPosts')
    const { posts } = await data
    dispatch({ type: GET_POSTS_SUCCESS, payload: await posts })
  } catch (error) {
    dispatch({ type: GET_POSTS_FAIL, payload: error })
  }
}

export const deletePost = (id, public_id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_POST_REQUEST })
  const { loginReducer } = getState()
  const { user } = loginReducer
  const { accessToken } = user

  const config = {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    params: {
      postId: id,
      public_id,
    },
  }

  try {
    const { data } = await axios.delete('/api/post/deletePost', config)
    console.log(data)
    dispatch({ type: DELETE_POST_SUCCESS, payload: data.post })
    dispatch(getPosts())    
  } catch (error) {
    console.log('/frontend /postActions deletePost ->', error)
    dispatch({ type: DELETE_POST_FAIL, payload: error })
  }
}

export const likePost = (action, postId, username, likesCount) => async (
  dispatch,
  getState
) => {
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
    action,
    postId,
    username
  }

  try {
    await axios.post('/api/post/likePost', body, config)
    if(action === 'like') {
      dispatch({ type: LIKE_POST, payload: action })          
      const newLikesCount = likesCount + 1  
      return { isLiked: true, newLikesCount }    
    } else { 
      dispatch({ type: UNLIKE_POST, payload: action })      
      const newLikesCount = likesCount - 1
      return { isLiked: false, newLikesCount }     
    }
  } catch (error) {
    action === 'like'
      ? dispatch({ type: LIKE_POST_FAIL, payload: error })
      : dispatch({ type: UNLIKE_POST_FAIL, payload: error })
  }
}
