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
} from '../constants/postConstants'
import { uploadPostImg } from '../utils/images/upload'

export const createPost = (title, description, image) => async (dispatch, getState) => {
  dispatch({type: CREATE_POST_REQUEST})
  const { loginReducer } = getState()  
  const { user } = loginReducer
  const { accessToken } = user

  const imgObj = await uploadPostImg(image, accessToken)
  console.log('This is the image URL from /postActions uploadPost(image)', imgObj)

  const body = {
    title,
    description,
    image: await imgObj
  }
  
  const config = {
    headers: {
      'Content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    }
  }

  try {
    const { data } = await axios.post('/api/post/createPost', body, config) 
    const { post } = await data
    dispatch({type: CREATE_POST_SUCCESS, payload: post})
    dispatch(getPosts())
  } catch (error) {
    console.log('/frontend /postActions.js ->', error)
    dispatch({type: CREATE_POST_FAIL, payload: error})
  }
}


export const getPosts = () => async (dispatch, getState) => {
  dispatch({type: GET_POSTS_REQUEST})

  try {
    const { data } = await axios.get('/api/post/getPosts') 
    console.log(data)
    const { posts } = await data
    dispatch({type: GET_POSTS_SUCCESS, payload: posts})
  } catch (error) {
    dispatch({type: GET_POSTS_FAIL, payload: error})
  }
}

export const deletePost = (id, public_id) => async (dispatch, getState) => {
  dispatch({type: DELETE_POST_REQUEST})
  const { loginReducer } = getState()  
  const { user } = loginReducer
  const { accessToken } = user   

  const config = {
    headers: {
      'Content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    },
    params: {
      postId: id,
      public_id
    }
  }

  try {
    const { data } = await axios.delete('/api/post/deletePost', config) 
    console.log(data)    
    dispatch({type: DELETE_POST_SUCCESS, payload: data.post})
    dispatch(getPosts())
  } catch (error) {
    console.log('/frontend /postActions deletePost ->', error)
    dispatch({type: DELETE_POST_FAIL, payload: error})
  }
}
