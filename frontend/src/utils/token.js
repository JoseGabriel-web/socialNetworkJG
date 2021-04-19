export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', JSON.stringify(token))
}
export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', JSON.stringify(token))
}
export const getAccessToken = () => {
  let item = window.localStorage.getItem('accessToken')
  return item ? JSON.parse(item) : ''
}
export const getRefreshToken = () => {
  let item = window.localStorage.getItem('refreshToken')
  return item ? JSON.parse(item) : ''
}
export const removeTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}