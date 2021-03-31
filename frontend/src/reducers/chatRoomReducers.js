import * as chatRoomConstants from '../constants/chatRoomConstants.js'

export const chatRoomInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case chatRoomConstants.GET_CHATROOM_FAIL:
      return { loading: false }
    case chatRoomConstants.GET_CHATROOM_REQUEST:
      return { loading: true }
    case chatRoomConstants.GET_CHATROOM_SUCCESS:
      return { loading: false, chatRoomId: action.payload.chatRoomId, messages: action.payload.messages, users: action.payload.users }
    default:
      return state
  }
}