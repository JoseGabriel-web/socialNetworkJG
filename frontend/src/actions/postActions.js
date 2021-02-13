import axios from 'axios'
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS
} from '../constants/postConstants'
import { uploadPost } from '../utils/uploadPost'

export const createPost = (title, description, image) => async (dispatch, getState) => {
  dispatch({type: CREATE_POST_REQUEST})
  const { loginReducer } = getState()  
  const { user } = loginReducer
  const { accessToken } = user

  const imgUrl = await uploadPost(image)
  console.log('This is the image URL from /postActions uploadPost(image)', imgUrl)
  const body = {
    title,
    description,
    image: await imgUrl
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
  
  const config = {
    headers: {
      'Content-type': 'application/json',      
    }
  }

  try {
    const { data } = await axios.get('/api/post/getPosts') 
    console.log(data)
    const { posts } = await data
    dispatch({type: GET_POSTS_SUCCESS, payload: posts})
  } catch (error) {
    dispatch({type: GET_POSTS_FAIL, payload: error})
  }
}