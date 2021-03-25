import axios from 'axios'
import * as chatRoomConstants from '../constants/chatRoomConstants.js'

export const getChatRoom = (users) => async (dispatch) => {
  try {
    dispatch({ type: chatRoomConstants.GET_CHATROOM_REQUEST })
    const { data } = await axios.post('/api/chatRoom/getChatRoom', { users })
    console.log(data)
    dispatch({ type: chatRoomConstants.GET_CHATROOM_SUCCESS, payload: data })
  } catch(error) {
    console.log(error)
    dispatch({ type: chatRoomConstants.GET_CHATROOM_FAIL })
  }
}