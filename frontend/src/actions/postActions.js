import axios from 'axios'
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS
} from '../constants/postConstants'

export const createPost = (title, description, image) => async (dispatch, getState) => {
  dispatch({type: CREATE_POST_REQUEST})
  const { loginReducer } = getState()  
  const { user } = loginReducer
  const { accessToken } = user

  const body = {
    title,
    description,
    image
  }
  console.log(accessToken)
  const config = {
    headers: {
      'Content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    }
  }

  try {
    const { data } = await axios.post('/api/post/createPost', body, config) 
    const { post } = data
    dispatch({type: CREATE_POST_SUCCESS, payload: post})
  } catch (error) {
    dispatch({type: CREATE_POST_FAIL, payload: error})
  }
}