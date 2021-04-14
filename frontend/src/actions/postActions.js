import axios from 'axios'
import * as postConstants from '../constants/postConstants'

export const createPost = (title, description, image) => async (
  dispatch,
  getState
) => {
  dispatch({ type: postConstants.CREATE_POST_REQUEST })
  dispatch({ type: postConstants.GET_POSTS_REQUEST })

  const body = new FormData()
  body.append('title', title)
  body.append('image', image)
  body.append('description', description)  

  try {
    const { data } = await axios.post('/api/post/createPost', body)
    const { message } = await data
    dispatch({ type: postConstants.CREATE_POST_SUCCESS, payload: message })
    if(await data) {
      dispatch(getPosts())
    }
  } catch (error) {    
    dispatch({ type: postConstants.CREATE_POST_FAIL, payload: error.response.data.error })
  }
}

export const getPosts = () => async (dispatch, getState) => {
  dispatch({ type: postConstants.GET_POSTS_REQUEST })  
  try {    
    const { data } = await axios.get('/api/post/getPosts')    
    dispatch({ type: postConstants.GET_POSTS_SUCCESS, payload: data.posts })
  } catch (error) {
    dispatch({ type: postConstants.GET_POSTS_FAIL, payload: 'error.response.data.error' })
  }
}

export const deletePost = (id, public_id) => async (dispatch) => {
  dispatch({ type: postConstants.DELETE_POST_REQUEST })
  const config = {
    params: {
      postId: id,
      public_id,
    },
  }
  
  try {
    const { data } = await axios.delete('/api/post/deletePost', config)
    console.log(data)
    dispatch({ type: postConstants.DELETE_POST_SUCCESS, payload: data.post })
    dispatch(getPosts())    
  } catch (error) {    
    dispatch({ type: postConstants.DELETE_POST_FAIL, payload: error.response.data.error })
  }
}

export const likePost = (action, postId, likesCount) => async ( dispatch, _ ) => {
  try {
    await axios.post('/api/post/likePost', { action, postId })
    if(action === 'like') {
      dispatch({ type: postConstants.LIKE_POST, payload: action })          
      const newLikesCount = likesCount + 1  
      return { isLiked: true, newLikesCount }    
    } else { 
      dispatch({ type: postConstants.UNLIKE_POST, payload: action })      
      const newLikesCount = likesCount - 1
      return { isLiked: false, newLikesCount }     
    }
  } catch (error) {
    action === 'like'
      ? dispatch({ type: postConstants.LIKE_POST_FAIL, payload: error.response.data.error })
      : dispatch({ type: postConstants.UNLIKE_POST_FAIL, payload: error.response.data.error })
      return { isLiked: null, newLikesCount: likesCount }  
  }
}
