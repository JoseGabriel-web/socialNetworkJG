import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  registerReducer,
  loginReducer
} from './reducers/userReducers'
import {
  createPostReducer,
  getPostsReducer,
  likePostReducer,
  deletePostReducer
} from './reducers/postReducers'
import {
  profileReducer
} from './reducers/profileReducers'
import {
  followUserReducer,
  unFollowUserReducer,
  userFollowersListReducer
} from './reducers/followerReducers'

const reducers = combineReducers({
  registerReducer,
  loginReducer,
  createPostReducer,
  getPostsReducer,
  likePostReducer,
  deletePostReducer,
  profileReducer,
  followUserReducer,
  unFollowUserReducer,
  userFollowersListReducer
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
));

export { store }