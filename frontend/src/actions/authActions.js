import axios from "axios"
import * as authConstants from "../constants/authConstants"
import * as userConstants from "../constants/userConstants"
import { token } from ".././utils/index"

export const registerAction = (name, email, password, history) => async (
  dispatch
) => {
  dispatch({ type: authConstants.REGISTER_REQUEST })

  try {
    const { data } = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    })
    token.setAccessToken(data.accessToken)
    token.setRefreshToken(data.refreshToken)
    dispatch({ type: authConstants.REGISTER_SUCCESS })
    return history.push("/home")
  } catch (error) {
    dispatch({
      type: authConstants.REGISTER_FAIL,
      payload: error.response.data,
    })
  }
}

export const loginAction = (email, password, history) => async (dispatch) => {
  dispatch({ type: authConstants.LOGIN_REQUEST })
  try {
    const { data } = await axios.post("/api/auth/login", { email, password })
    token.setAccessToken(data.accessToken)
    token.setRefreshToken(data.refreshToken)
    dispatch({ type: authConstants.LOGIN_SUCCESS })
    return history.push("/home")
  } catch (error) {
    dispatch({ type: authConstants.LOGIN_FAIL, payload: error.response.data })
  }
}

export const logoutAction = () => async (dispatch) => {
  dispatch({ type: authConstants.LOGOUT_REQUEST })
  try {
    await axios.delete("/api/auth/logout", {
      params: { refreshToken: token.getRefreshToken() },
    })
    token.removeTokens()
    localStorage.removeItem("user")
    dispatch({ type: userConstants.GET_USER_INFO_FAIL })
  } catch (error) {
    dispatch({ type: authConstants.LOGOUT_FAIL, payload: error.response.data })
  }
}
