import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as userReducers from './reducers/userReducers'
import * as authReducers from './reducers/authReducers'
import * as postReducers from './reducers/postReducers'
import * as chatRoomReducers from './reducers/chatRoomReducers'
import * as profileReducers from './reducers/profileReducers'
import * as followerReducers from './reducers/followerReducers'
import * as postCommentReducers from './reducers/postCommentReducers'
import * as profilePictureReducers from './reducers/profilePictureReducers'

const reducers = combineReducers({
  createPostReducer: postReducers.createPostReducer,
  getPostsReducer: postReducers.getPostsReducer,
  likePostReducer: postReducers.likePostReducer,
  deletePostReducer: postReducers.deletePostReducer,
  profileReducer: profileReducers.profileReducer,
  followUserReducer: followerReducers.followUserReducer,
  unFollowUserReducer: followerReducers.unFollowUserReducer,
  userFollowersListReducer: followerReducers.userFollowersListReducer,
  updateProfilePictureReducer: profilePictureReducers.updateProfilePictureReducer,
  createPostComment: postCommentReducers.createPostComment,
  deletePostComment: postCommentReducers.deletePostComment,  
  registerReducer: authReducers.registerReducer,
  loginReducer: authReducers.loginReducer,
  userInfoReducer: userReducers.userInfoReducer,
  chatRoomInfoReducer: chatRoomReducers.chatRoomInfoReducer,
  getAllUsersReducer: userReducers.getAllUsersReducer,
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
));

export { store }