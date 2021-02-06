import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  registerReducer,
  loginReducer
} from './reducers/userReducers'

const reducers = combineReducers({
  registerReducer,
  loginReducer
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
));

export { store }